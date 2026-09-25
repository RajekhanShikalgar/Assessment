/**
 * ============================================================================
 * Continuous Internal Evaluation Management System (CIEMS) - Google Apps Script
 * ============================================================================
 * Functions handled:
 * 1. Email Relay (Via Gmail on HTTPS Port 443 - Bypasses Render SMTP blocking)
 * 2. SQLite Database Backup to Google Drive (Persistent Cloud Storage)
 * 3. SQLite Database Restore from Google Drive on Deployment / Restart
 * 4. Health / Ping Check
 * ============================================================================
 */

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
      var blob = Utilities.newBlob(decodedBytes, "application/x-sqlite3", "ciems_assessment_backup.db");
      
      // Delete any older backup file to avoid duplicates
      var existingFiles = DriveApp.getFilesByName("ciems_assessment_backup.db");
      while (existingFiles.hasNext()) {
        var oldFile = existingFiles.next();
        oldFile.setTrashed(true);
      }
      
      // Save new file directly into Google Drive
      var newFile = DriveApp.createFile(blob);
      newFile.setDescription("CIEMS Portal SQLite Backup | Created: " + (data.timestamp || new Date().toISOString()));
      
      return respondJson({
        status: "success",
        message: "Database permanently backed up to Google Drive!",
        file_id: newFile.getId(),
        size_bytes: decodedBytes.length,
        timestamp: new Date().toISOString()
      });
    }

    // ------------------------------------------------------------------------
    // 2. DATABASE RESTORE FROM GOOGLE DRIVE (action: 'restore_db')
    // ------------------------------------------------------------------------
    if (action === "restore_db") {
      var files = DriveApp.getFilesByName("ciems_assessment_backup.db");
      if (files.hasNext()) {
        var backupFile = files.next();
        var fileBlob = backupFile.getBlob();
        var fileBytes = fileBlob.getBytes();
        var base64Data = Utilities.base64Encode(fileBytes);
        
        return respondJson({
          status: "success",
          found: true,
          message: "Latest backup found on Google Drive",
          size_bytes: fileBytes.length,
          last_updated: backupFile.getLastUpdated().toISOString(),
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
      var checkFiles = DriveApp.getFilesByName("ciems_assessment_backup.db");
      var hasBackup = checkFiles.hasNext();
      var lastMod = hasBackup ? checkFiles.next().getLastUpdated().toISOString() : null;
      
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
