//      ___           ___           ___           ___     
//     /  /\         /  /\         /  /\         /  /\    
//    /  /::\       /  /:/_       /  /:/        /  /:/    
//   /  /:/\:\     /  /:/ /\     /  /:/        /  /:/     
//  /  /:/  \:\   /  /:/ /::\   /  /:/  ___   /  /:/  ___ 
// /__/:/ \__\:\ /__/:/ /:/\:\ /__/:/  /  /\ /__/:/  /  /\
// \  \:\ /  /:/ \  \:\/:/~/:/ \  \:\ /  /:/ \  \:\ /  /:/
//  \  \:\  /:/   \  \::/ /:/   \  \:\  /:/   \  \:\  /:/ 
//   \  \:\/:/     \__\/ /:/     \  \:\/:/     \  \:\/:/  
//    \  \::/        /__/:/       \  \::/       \  \::/   
//     \__\/         \__\/         \__\/         \__\/    
//  _   _       _     _            
// | \ | | ___ | | __| | ___ _ __  
// |  \| |/ _ \| |/ _` |/ _ \ '_ \ 
// | |\  | (_) | | (_| |  __/ | | |
// |_| \_|\___/|_|\__,_|\___|_| |_|
//                                
//  ____                 
// | __ )  ___  _ __ ___ 
// |  _ \ / _ \| '__/ __|
// | |_) | (_) | |  \__ \
// |____/ \___/|_|  |___/
                      
// Library Imports
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { NgxSimpleTextEditorModule } from 'ngx-simple-text-editor';

import { CommonModule } from '@angular/common';  

// Component Imports
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FragmentsComponent } from './fragments/fragments.component';
// import { DashboardComponent } from './dashboard/dashboard.component';
// import { LoginComponent } from './login/login.component';
// import { AuthGuard } from './auth/auth.guard';
import { SafeHtmlPipe } from './pipes/safeHtml.pipe';
// import { SafeHtmlPipe } from './fragments/fragments.component';

// import { ConfirmationDialog } from './services/dialog.service';
import { AboutDialog } from './services/dialog.service';
import { WhatsNewDialog } from './services/dialog.service';
import { ContactDialog } from './services/dialog.service';
import { ApiDialog } from './services/dialog.service';
import { DownloadsDialog } from './services/dialog.service';
import { MultimediaDialog } from './services/dialog.service';
import { TaxaDialog } from './services/dialog.service';
import { SpecimensDialog } from './services/dialog.service';

// import { CustomDialog } from './services/dialog.service';

// import { Multiplayer } from './fragments/fragments.component';
// Directives

import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpErrorInterceptor } from './api.service';

// Material Imports
import {MatFormFieldModule} from '@angular/material/form-field'; 
import {MatSelectModule} from '@angular/material/select'; 
import {MatSortModule} from '@angular/material/sort';
import {MatListModule} from '@angular/material/list'; 
import {MatProgressBarModule} from '@angular/material/progress-bar'; 
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner'; 
import {MatExpansionModule} from '@angular/material/expansion';
import {MatTabsModule} from '@angular/material/tabs';  
import {MatDialogModule} from '@angular/material/dialog'; 
import {MatMenuModule} from '@angular/material/menu';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar'; 
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatSlideToggleModule} from '@angular/material/slide-toggle'; 
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatRadioModule} from '@angular/material/radio';  
import {MatIconModule} from '@angular/material/icon'; 
import {MatTooltipModule} from '@angular/material/tooltip'; 
import {MatTableModule} from '@angular/material/table'; 
import {MatGridListModule} from '@angular/material/grid-list'; 
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatPaginatorModule} from '@angular/material/paginator'; 
import {MatSidenavModule} from '@angular/material/sidenav'; 
import {MatTreeModule} from '@angular/material/tree'; 
// Allows copying to clipboard
// import {ClipboardModule} from '@angular/cdk/clipboard';
// import { QuillModule } from 'ngx-quill'
// import { TextComponent } from './text/text.component'; 

import {TranslateLoader, TranslateModule} from "@ngx-translate/core";
import {TranslateHttpLoader} from "@ngx-translate/http-loader";
import {HttpClient} from "@angular/common/http";

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}



// Allows a virtual keyboard
// import { IKeyboardLayouts, keyboardLayouts, MAT_KEYBOARD_LAYOUTS, MatKeyboardModule } from '@efaps/angular-onscreen-material-keyboard';

// Allows communication with firebase
// import { AngularFireModule } from '@angular/fire';
// import { environment } from '../environments/environment';
// import { ScansionComponent } from './scansion/scansion.component';
// import { TestsComponent } from './tests/tests.component';

// Virtual Keyboard Layout
// const customLayouts: IKeyboardLayouts = {
//   ...keyboardLayouts,
//   'OSCCLayout': {
//     'name': 'OSCCLayout',
//     'keys': [
//       [
//         ['???', '???'],
//         ['???', '???'],
//         ['???', '???'],
//         ['??', '??'],
//         ['-', '-'],
//         ['???', '???'],
//         ['???', '???'],
//         ['???', '???'],  
//       ]
//     ],
//     'lang': ['OSCC']
//   }
// };

// Routes to take. Disallows Path Traversal.
const appRoutes: Routes = [
  {path: '', component: FragmentsComponent},
  {path: 'fragments', component: FragmentsComponent},
  // {path: 'text', component: TextComponent},
  // {path: 'tests', component: TestsComponent, canActivate: [AuthGuard]},
  // {path: 'scansion', component: ScansionComponent, canActivate: [AuthGuard]},
  // {path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard]},
  {path: '**', redirectTo: ''}
]

@NgModule({
  declarations: [
    AppComponent,
    FragmentsComponent,
    SafeHtmlPipe,
    // DashboardComponent,
    // LoginComponent,
    // TextComponent,
    // ScansionComponent,
    // Multiplayer,
    // ConfirmationDialog,
    AboutDialog,
    WhatsNewDialog,
    ContactDialog,
    ApiDialog,
    DownloadsDialog,
    SpecimensDialog,
    MultimediaDialog,
    TaxaDialog,
    // CustomDialog,
    // TestsComponent,
    // DialogContentComponent,
    ],
  imports: [
    BrowserModule,
    CommonModule,
    AppRoutingModule,
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      },
      defaultLanguage: 'en',
    }),
    RouterModule.forRoot(appRoutes, {}),
    // QuillModule.forRoot(), // rich text editor
    // Multiplayer,
    NgxSimpleTextEditorModule,

    FormsModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    // All needed Material modules
    MatButtonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatSelectModule,
    MatSortModule,
    MatProgressBarModule,
    MatExpansionModule,
    MatListModule,
    MatMenuModule,
    MatTabsModule,
    MatFormFieldModule,
    MatInputModule,
    MatToolbarModule,
    MatSnackBarModule,
    MatSlideToggleModule,
    MatCheckboxModule,
    MatIconModule,
    MatRadioModule,
    MatTooltipModule,
    MatProgressSpinnerModule,
    MatTableModule, // Not currently used
    MatGridListModule,
    MatAutocompleteModule,
    MatButtonToggleModule,
    MatPaginatorModule,
    MatSidenavModule,
    MatTreeModule,
    // To allow the drag and drop
    DragDropModule,
    // ClipboardModule,
    // MatKeyboardModule,

    // AngularFireModule.initializeApp(environment.firebase),
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpErrorInterceptor,
      multi: true,
      
    },
    // { 
    //   provide: MatDialogRef, 
    // },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
export class PipesModule { }