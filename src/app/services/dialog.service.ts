import { Injectable, Inject, Component } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Observable } from 'rxjs';



/**
 * This service handles the dialogs used in the OSCC
 */

@Injectable({
  providedIn: 'root'
})
export class DialogService {

  constructor(
    private dialog: MatDialog, 
  ) { }

  /**
   * This function handles the settings dialog. Settings are passed in the data object.
   * @param settings oscc_settings object with all settings that can be changed
   * @returns Observable with the oscc_settings object if successful
   * @author Ycreak
   * TODO: have a close button that discards changes?
   */
  public open(content, category : string): void {
    
    let parameters : object = {
      width: 'auto',
      height: 'auto',
      data: content
    }

    if ( category == 'multimedia' ) { const dialogRef = this.dialog.open(MultimediaDialog, parameters); }
    if ( category == 'taxa' ) { const dialogRef = this.dialog.open(TaxaDialog, parameters); }
    if ( category == 'specimens' ) { const dialogRef = this.dialog.open(SpecimensDialog, parameters); }
    
    if ( category == 'about' ) { const dialogRef = this.dialog.open(AboutDialog, parameters); }
    if ( category == 'whatsnew' ) { const dialogRef = this.dialog.open(WhatsNewDialog, parameters); }
    if ( category == 'downloads' ) { const dialogRef = this.dialog.open(DownloadsDialog, parameters); }
    if ( category == 'api' ) { const dialogRef = this.dialog.open(ApiDialog, parameters); }
    if ( category == 'contact' ) { const dialogRef = this.dialog.open(ContactDialog, parameters); }

  }




}

/**
 * Class to show the settings dialog. 
 * The provided 'data' is used to communicate the settings.
 */
@Component({
  selector: 'multimedia-dialog',
  templateUrl: '../dialogs/multimedia-dialog.html',
  styleUrls: ['../dialogs/dialogs.scss'],
})
export class MultimediaDialog {
  constructor(
    public dialogRef: MatDialogRef<MultimediaDialog>,
    @Inject(MAT_DIALOG_DATA) public data) { 
  }
}

/**
 * Class to show the settings dialog. 
 * The provided 'data' is used to communicate the settings.
 */
@Component({
  selector: 'taxa-dialog',
  templateUrl: '../dialogs/taxa-dialog.html',
  styleUrls: ['../dialogs/dialogs.scss'],
})
export class TaxaDialog {
  constructor(
    public dialogRef: MatDialogRef<TaxaDialog>,
    @Inject(MAT_DIALOG_DATA) public data) { 
  }
}

/**
 * Class to show the settings dialog. 
 * The provided 'data' is used to communicate the settings.
 */
@Component({
  selector: 'specimens-dialog',
  templateUrl: '../dialogs/specimens-dialog.html',
  styleUrls: ['../dialogs/dialogs.scss'],
})
export class SpecimensDialog {
  constructor(
    public dialogRef: MatDialogRef<SpecimensDialog>,
    @Inject(MAT_DIALOG_DATA) public data) { 
  }
}

/**
 * Class to show the settings dialog. 
 * The provided 'data' is used to communicate the settings.
 */
@Component({
  selector: 'about-dialog',
  templateUrl: '../dialogs/about-dialog.html',
  styleUrls: ['../dialogs/dialogs.scss'],
})
export class AboutDialog {
  constructor(
    public dialogRef: MatDialogRef<AboutDialog>,
    @Inject(MAT_DIALOG_DATA) public data) { 
  }
}

/**
 * Class to show the settings dialog. 
 * The provided 'data' is used to communicate the settings.
 */
@Component({
  selector: 'whatsnew-dialog',
  templateUrl: '../dialogs/whatsnew-dialog.html',
  styleUrls: ['../dialogs/dialogs.scss'],
})
export class WhatsNewDialog {
  constructor(
    public dialogRef: MatDialogRef<WhatsNewDialog>,
    @Inject(MAT_DIALOG_DATA) public data) { 
  }
}

/**
 * Class to show the settings dialog. 
 * The provided 'data' is used to communicate the settings.
 */
@Component({
  selector: 'downloads-dialog',
  templateUrl: '../dialogs/downloads-dialog.html',
  styleUrls: ['../dialogs/dialogs.scss'],
})
export class DownloadsDialog {
  constructor(
    public dialogRef: MatDialogRef<DownloadsDialog>,
    @Inject(MAT_DIALOG_DATA) public data) { 
  }
}

/**
 * Class to show the settings dialog. 
 * The provided 'data' is used to communicate the settings.
 */
@Component({
  selector: 'api-dialog',
  templateUrl: '../dialogs/api-dialog.html',
  styleUrls: ['../dialogs/dialogs.scss'],
})
export class ApiDialog {
  constructor(
    public dialogRef: MatDialogRef<ApiDialog>,
    @Inject(MAT_DIALOG_DATA) public data) { 
  }
}

/**
 * Class to show the settings dialog. 
 * The provided 'data' is used to communicate the settings.
 */
@Component({
  selector: 'contact-dialog',
  templateUrl: '../dialogs/contact-dialog.html',
  styleUrls: ['../dialogs/dialogs.scss'],
})
export class ContactDialog {
  constructor(
    public dialogRef: MatDialogRef<ContactDialog>,
    @Inject(MAT_DIALOG_DATA) public data) { 
  }
}