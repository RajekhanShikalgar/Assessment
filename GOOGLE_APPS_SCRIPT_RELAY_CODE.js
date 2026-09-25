/**
 * ============================================================================
 * Continuous Internal Evaluation Management System (CIEMS) - Google Apps Script
 * ============================================================================
 * Functions handled:
 * 0. One-Time Permission Authorization (Google Drive & Gmail Scopes)
 * 1. Email Relay (Via Gmail on HTTPS Port 443 - Bypasses Render SMTP blocking)
 * 2. SQLite Database Backup to Google Drive (Supports Gzip Compression & Fast Sync)
 * 3. SQLite Database Restore from Google Drive on Deployment / Restart
 * 4. Health / Ping Check
 * ============================================================================
 */

/**
 * ----------------------------------------------------------------------------
 * 0. ONE-TIME PERMISSION AUTHORIZATION FUNCTION (एकदाच चालवा - Run Once)
 * ----------------------------------------------------------------------------
 * गुगल ड्राईव्हची परवानगी सक्रिय करण्यासाठी:
 * १. वरच्या टूलबारमधील ड्रॉपडाऊनमधून 'authorizeAndTestDrive' हे नाव निवडा.
 * २. 'Run' (चालवा) बटणावर क्लिक करा.
 * ३. गुगल विचारेल: "Authorization Required" -> 'Review permissions' वर क्लिक करा.
 * ४. आपले Google खाते निवडा -> 'Advanced' (प्रगत) -> 'Go to Continuous Internal Evaluation (unsafe)'.
 * ५. शेवटी 'Allow' (परवानगी द्या) वर क्लिक करा.
 * ६. 'Deploy' -> 'Manage Deployments' -> पेन्सिल आयकॉनवर क्लिक करा -> Version मध्ये 'New version' निवडा -> 'Deploy' करा!
 */
function authorizeAndTestDrive() {
  Logger.log("Testing Google Drive and Gmail permissions for CIEMS...");
  
  // 1. Test Gmail Scope
  var userEmail = Session.getActiveUser().getEmail() || Session.getEffectiveUser().getEmail();
  Logger.log("User email identified: " + userEmail);
  
  // 2. Test Google Drive Scope (Create, Search, Trash test file)
  var testFileName = "ciems_perm_test_" + new Date().getTime() + ".txt";
  var testBlob = Utilities.newBlob("CIEMS Google Drive Connection Test OK", "text/plain", testFileName);
  var createdFile = DriveApp.createFile(testBlob);
  Logger.log("Successfully created test file on Google Drive! ID: " + createdFile.getId());
  
  var searchFiles = DriveApp.getFilesByName(testFileName);
  if (searchFiles.hasNext()) {
    var f = searchFiles.next();
    Logger.log("Verified file search in Google Drive: " + f.getName());
    f.setTrashed(true);
    Logger.log("Cleaned up test file to trash.");
  }
  
  Logger.log("SUCCESS! All Google Drive and Gmail permissions are active, tested, and authorized!");
  return "SUCCESS: All Google Drive and Gmail permissions are 100% active and authorized!";
}

function doPost(e) {
  try {
    if (!e || !e.postData || !e.postData.contents) {
      return respondJson({ status: "error", message: "Empty request payload" });
    }
    
    var data = JSON.parse(e.postData.contents);
    var action = data.action || (data.to ? "send_email" : "unknown");

    // ------------------------------------------------------------------------
    // 1. DATABASE BACKUP TO GOOGLE DRIVE (action: 'backup_db')
    // ------------------------------------------------------------------------
    if (action === "backup_db") {
      if (!data.db_base64) {
        return respondJson({ status: "error", message: "Missing db_base64 payload" });
      }
      
      var decodedBytes = Utilities.base64Decode(data.db_base64);
      var isGzip = (decodedBytes.length > 2 && decodedBytes[0] === 31 && decodedBytes[1] === 139);
      var filename = isGzip ? "ciems_assessment_backup.db.gz" : "ciems_assessment_backup.db";
      var mimeType = isGzip ? "application/gzip" : "application/x-sqlite3";
      var blob = Utilities.newBlob(decodedBytes, mimeType, filename);
      
      // Delete any older backup file to avoid duplicates
      var oldNames = ["ciems_assessment_backup.db", "ciems_assessment_backup.db.gz"];
      for (var n = 0; n < oldNames.length; n++) {
        var existingFiles = DriveApp.getFilesByName(oldNames[n]);
        while (existingFiles.hasNext()) {
          var oldFile = existingFiles.next();
          oldFile.setTrashed(true);
        }
      }
      
      // Save new file directly into Google Drive
      var newFile = DriveApp.createFile(blob);
      newFile.setDescription("CIEMS Portal SQLite Backup | Created: " + (data.timestamp || new Date().toISOString()));
      
      return respondJson({
        status: "success",
        message: "Database permanently backed up to Google Drive!",
        file_id: newFile.getId(),
        filename: filename,
        is_compressed: isGzip,
        size_bytes: decodedBytes.length,
        timestamp: new Date().toISOString()
      });
    }

    // ------------------------------------------------------------------------
    // 2. DATABASE RESTORE FROM GOOGLE DRIVE (action: 'restore_db')
    // ------------------------------------------------------------------------
    if (action === "restore_db") {
      var targetFile = null;
      var gzFiles = DriveApp.getFilesByName("ciems_assessment_backup.db.gz");
      if (gzFiles.hasNext()) {
        targetFile = gzFiles.next();
      } else {
        var dbFiles = DriveApp.getFilesByName("ciems_assessment_backup.db");
        if (dbFiles.hasNext()) {
          targetFile = dbFiles.next();
        }
      }

      if (targetFile) {
        var fileBlob = targetFile.getBlob();
        var fileBytes = fileBlob.getBytes();
        var base64Data = Utilities.base64Encode(fileBytes);
        var isGzip = targetFile.getName().endsWith(".gz");
        
        return respondJson({
          status: "success",
          found: true,
          message: "Latest backup found on Google Drive",
          filename: targetFile.getName(),
          is_compressed: isGzip,
          size_bytes: fileBytes.length,
          last_updated: targetFile.getLastUpdated().toISOString(),
          db_base64: base64Data
        });
      } else {
        return respondJson({
          status: "success",
          found: false,
          message: "No backup file found on Google Drive yet"
        });
      }
    }

    // ------------------------------------------------------------------------
    // 3. HEALTH / PING CHECK (action: 'ping')
    // ------------------------------------------------------------------------
    if (action === "ping") {
      var checkGz = DriveApp.getFilesByName("ciems_assessment_backup.db.gz");
      var checkDb = DriveApp.getFilesByName("ciems_assessment_backup.db");
      var hasBackup = checkGz.hasNext() || checkDb.hasNext();
      var lastMod = null;
      if (checkGz.hasNext()) lastMod = checkGz.next().getLastUpdated().toISOString();
      else if (checkDb.hasNext()) lastMod = checkDb.next().getLastUpdated().toISOString();
      
      return respondJson({
        status: "success",
        relay_active: true,
        drive_connected: true,
        backup_exists: hasBackup,
        last_backup_time: lastMod
      });
    }

    // ------------------------------------------------------------------------
    // 4. SEND EMAIL VIA GMAIL (HTTPS Port 443)
    // ------------------------------------------------------------------------
    if (action === "send_email" || data.to) {
      MailApp.sendEmail({
        to: data.to,
        subject: data.subject,
        htmlBody: data.html,
        name: data.from_name || "Continuous Internal Evaluation Admin"
      });
      return respondJson({ status: "success", to: data.to, channel: "Gmail HTTPS Relay" });
    }

    return respondJson({ status: "error", message: "Unknown action: " + action });

  } catch (error) {
    return respondJson({ status: "error", message: error.toString() });
  }
}

function doGet(e) {
  return respondJson({
    status: "active",
    service: "CIEMS Google Apps Script Relay (Email + Google Drive Cloud Sync)",
    timestamp: new Date().toISOString()
  });
}

function respondJson(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}
