// Important links
// https://api.biodiversitydata.nl/v2/multimedia/metadata/getFieldInfo

// Library imports
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MatDialog } from '@angular/material/dialog'; // Library used for interacting with the page
import { trigger, transition, style, animate, state } from '@angular/animations';
import { filter, fromEvent, Observable, Subscription } from "rxjs";
import { ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
// Component imports
// import { LoginComponent } from '../login/login.component'
import { UntypedFormBuilder, FormControl, UntypedFormGroup, Validators, FormArray } from '@angular/forms';

import {CollectionViewer, SelectionChange, DataSource} from '@angular/cdk/collections';
import {FlatTreeControl} from '@angular/cdk/tree';
import {Injectable} from '@angular/core';
import {BehaviorSubject, merge} from 'rxjs';
import {map} from 'rxjs/operators';

import {MatTreeNestedDataSource} from '@angular/material/tree';
import {NestedTreeControl} from '@angular/cdk/tree';

// Service imports
import { ApiService } from '../api.service';
import { DialogService } from '../services/dialog.service';
import { UtilityService } from '../utility.service';
import { Dialog } from '@angular/cdk/dialog';
// import { AuthService } from '../auth/auth.service';

import {TranslateService} from "@ngx-translate/core";

@Component({
  selector: 'app-fragments',
  templateUrl: './fragments.component.html',
  styleUrls: ['./fragments.component.scss'],
  encapsulation: ViewEncapsulation.None,
})

export class FragmentsComponent implements OnInit {
  
  languageList = [
    {code: 'en', label: 'English'},
    {code: 'nl', label: 'Dutch'}
  ];

  URL_SPECIMEN : string = 'https://api.biodiversitydata.nl/v2/specimen/query/?_querySpec='
  URL_TAXA : string = 'https://api.biodiversitydata.nl/v2/taxon/query/?_querySpec='
  URL_MULTIMEDIA : string = 'https://api.biodiversitydata.nl/v2/multimedia/query/?_querySpec='

  data : object = {
    'specimens' : {},
    'taxa' : {},
    'multimedia' : {},
  }

  spinners : object = {
    'specimens' : true,
    'taxa' : true,
    'multimedia' : true,
  }

  search_in : object = {
    specimens : true,
    taxa : true,
    multimedia : true,
  }

  operator?: string = 'OR';
  language?: string = 'en';

  search_form: UntypedFormGroup = this.formBuilder.group({
    basic_term: '',
    scientific_name: '',
    common_name: '',
    family: '',
    genus: '',
    epithet: '',
    registration_number: '',
    source: '',
    collection_name: '',
    type_status: '',
    type_material: '',
    locality: '',
    phase_stage: '',
    sex: '',
    collector: '',
    collector_field_number: '',
    license: '',
    kingdom: '',
    phylum: '',
    class: '',
    order: '',
    subgenus: '',
    infraspecific_name: '',
    old_barcodes: '',
    chronostratigraphy: '',      
    lithostratigraphy: '',   
    biostratigraphy: '',   
  });

  query_condition_template = {
    "field" : "",
    "operator" : "",
    "value" : "",
    "or" : [],
  }

  query_spec_template = {
    "conditions": [],
    "logicalOperator": 'OR',
    // "size": 10,
    // "from": 0,
    // "sortFields": [],
    // "fields": []
  }

  search_form_operator: object = {
    basic_term: 'MATCHES',
    scientific_name: 'CONTAINS',
    common_name: 'MATCHES',
    family: 'CONTAINS',
    genus: 'CONTAINS',
    epithet: 'CONTAINS',
    registration_number: 'MATCHES',
    source: 'MATCHES',
    collection_name: 'MATCHES',
    type_status: 'MATCHES',
    type_material: 'MATCHES',
    locality: 'MATCHES',
    phase_stage: 'MATCHES',
    sex: 'MATCHES',
    collector: 'MATCHES',
    collector_field_number: 'MATCHES',
    license: 'MATCHES',
    kingdom: 'CONTAINS',
    phylum: 'CONTAINS',
    class: 'CONTAINS',
    order: 'CONTAINS',
    subgenus: 'CONTAINS',
    infraspecific_name: 'MATCHES',
    old_barcodes: 'MATCHES',
    chronostratigraphy: 'MATCHES',      
    lithostratigraphy: 'MATCHES',   
    biostratigraphy: 'MATCHES',   
  };

  nba_field_mapping = {
    'multimedia' : {
      'family' : [
        'identifications.defaultClassification.family'
      ],
      'license' : [
        'license'
      ],
      'class' : [
        'identifications.defaultClassification.className'
      ],
      'genus' : [
        'identifications.defaultClassification.genus',
        'identifications.scientificName.genusOrMonomial'
      ],  
      'kingdom' : [
        'identifications.defaultClassification.kingdom',
      ],
      'localityText' : [
        'gatheringEvents.localityText',
        'gatheringEvents.locality',
      ],
      'order' : [
        'identifications.defaultClassification.order',
      ],
      'phase_stage' : [
        'phasesOrStages'
      ],
      'phylum' : [
        'identifications.defaultClassification.phylum'
      ],
      'sex' : [
        'sexes'
      ],
      'source' : [
          'sourceSystem.code',
      ],
      'scientific_name' : [
        'identifications.scientificName.fullScientificName',
      ],
      'epithet' : [
          'identifications.defaultClassification.specificEpithet',
          'identifications.scientificName.specificEpithet',
      ],
      'infraspecific_name' : [
          'identifications.defaultClassification.infraspecificEpithet',
          'identifications.scientificName.infraspecificEpithet',
      ],
      'common_name' : [
        'identifications.vernacularNames.name',
        'identifications.taxonomicEnrichments.vernacularNames.name',
      ]
    },
    'specimens' : {
      'class' : [
        'identifications.defaultClassification.className'
      ],
      'collectorsFieldNumber' : [
          'collectorsFieldNumber'
      ],
      'gatheringAgent' : [
          'gatheringEvent.gatheringPersons.fullName',
          'gatheringEvent.gatheringOrganizations.name'
      ],
      'family' : [
          'identifications.defaultClassification.family'
      ],
      'genus' : [
          'identifications.defaultClassification.genus',
          'identifications.scientificName.genusOrMonomial'
      ],
      'kingdom' : [
          'identifications.defaultClassification.kingdom'
      ],
      'localityText' : [
          'gatheringEvent.localityText',
          'gatheringEvent.locality'
      ],
      'order' : [
          'identifications.defaultClassification.order'
      ],
      'phylum' : [
          'identifications.defaultClassification.phylum'
      ],
      'source' : [
          'sourceSystem.code'
      ],
      'scientific_name' : [
          'identifications.scientificName.fullScientificName'
      ],
      'epithet' : [
          'identifications.defaultClassification.specificEpithet',
          'identifications.scientificName.specificEpithet'
      ],
      'infraspecific_name' : [
          'identifications.defaultClassification.infraspecificEpithet',
          'identifications.scientificName.infraspecificEpithet'
      ],
      'subgenus' : [
          'identifications.defaultClassification.subgenus',
          'identifications.scientificName.subgenus'
      ],
      'common_name' : [
          'identifications.vernacularNames.name',
          'identifications.taxonomicEnrichments.vernacularNames.name'
      ],
      'typeStatus' : [
        'identifications.typeStatus'
      ],
      'collectionType' : [
        'collectionType'
      ],
      'theme' : [
        'theme'
      ],
      'phase_stage' : [
        'phaseOrStage'	
      ],
      'unitID' : [
        'unitID'	
      ],
      'sex' : [
        'sex'
      ],
      'kindOfUnit' : [
        'recordBasis',
        'kindOfUnit'
      ],
      'biostratigraphy' : [
        'gatheringEvent.bioStratigraphy.youngBioDatingQualifier',
        'gatheringEvent.bioStratigraphy.youngBioName',
        'gatheringEvent.bioStratigraphy.youngFossilZone',
        'gatheringEvent.bioStratigraphy.youngFossilSubZone',
        'gatheringEvent.bioStratigraphy.youngBioCertainty',
        'gatheringEvent.bioStratigraphy.youngStratType',
        'gatheringEvent.bioStratigraphy.bioDatingQualifier',
        'gatheringEvent.bioStratigraphy.rangePosition',
        'gatheringEvent.bioStratigraphy.oldBioName',
        'gatheringEvent.bioStratigraphy.bioIdentifier',
        'gatheringEvent.bioStratigraphy.oldFossilzone',
        'gatheringEvent.bioStratigraphy.oldFossilSubzone',
        'gatheringEvent.bioStratigraphy.oldBioCertainty',
        'gatheringEvent.bioStratigraphy.oldBioStratType',
      ],
      'chronostratigraphy' : [
        'gatheringEvent.chronoStratigraphy.youngRegionalSubstage',
        'gatheringEvent.chronoStratigraphy.youngRegionalStage',
        'gatheringEvent.chronoStratigraphy.youngRegionalSeries',
        'gatheringEvent.chronoStratigraphy.youngDatingQualifier',
        'gatheringEvent.chronoStratigraphy.youngInternSystem',
        'gatheringEvent.chronoStratigraphy.youngInternSubstage',
        'gatheringEvent.chronoStratigraphy.youngInternStage',
        'gatheringEvent.chronoStratigraphy.youngInternSeries',
        'gatheringEvent.chronoStratigraphy.youngInternErathem',
        'gatheringEvent.chronoStratigraphy.youngInternEonothem',
        'gatheringEvent.chronoStratigraphy.youngChronoName',
        'gatheringEvent.chronoStratigraphy.youngCertainty',
        'gatheringEvent.chronoStratigraphy.oldDatingQualifier',
        'gatheringEvent.chronoStratigraphy.oldRegionalSubstage',
        'gatheringEvent.chronoStratigraphy.oldRegionalStage',
        'gatheringEvent.chronoStratigraphy.oldRegionalSeries',
        'gatheringEvent.chronoStratigraphy.oldInternSystem',
        'gatheringEvent.chronoStratigraphy.oldInternSubstage',
        'gatheringEvent.chronoStratigraphy.oldInternStage',
        'gatheringEvent.chronoStratigraphy.oldInternSeries',
        'gatheringEvent.chronoStratigraphy.oldInternErathem',
        'gatheringEvent.chronoStratigraphy.oldInternEonothem',
        'gatheringEvent.chronoStratigraphy.oldChronoName',
        'gatheringEvent.chronoStratigraphy.chronoIdentifier',
        'gatheringEvent.chronoStratigraphy.oldCertainty', 
      ],
      'lithostratigraphy' : [
        'gatheringEvent.lithoStratigraphy.qualifier',
        'gatheringEvent.lithoStratigraphy.member2',
        'gatheringEvent.lithoStratigraphy.member',
        'gatheringEvent.lithoStratigraphy.informalName2',
        'gatheringEvent.lithoStratigraphy.informalName',
        'gatheringEvent.lithoStratigraphy.importedName2',
        'gatheringEvent.lithoStratigraphy.importedName1',
        'gatheringEvent.lithoStratigraphy.lithoIdentifier',
        'gatheringEvent.lithoStratigraphy.formation2',
        'gatheringEvent.lithoStratigraphy.formationGroup2',
        'gatheringEvent.lithoStratigraphy.formationGroup',
        'gatheringEvent.lithoStratigraphy.formation',
        'gatheringEvent.lithoStratigraphy.certainty2',
        'gatheringEvent.lithoStratigraphy.certainty',
        'gatheringEvent.lithoStratigraphy.bed2',
        'gatheringEvent.lithoStratigraphy.bed',
      ],
    },
    'taxa' : {
      'class' : [
        'defaultClassification.className'
      ],
      'family' : [
          'defaultClassification.family'
      ],
      'subgenus' : [
          'defaultClassification.subgenus',
          'acceptedName.subgenus',
          'synonyms.subgenus'
      ],
      'genus' : [
          'defaultClassification.genus',
          'acceptedName.genusOrMonomial',
          'synonyms.genusOrMonomial',
      ],
      'order' : [
          'defaultClassification.order'
      ],
      'phylum' : [
          'defaultClassification.phylum'
      ],
      'epithet' : [
          'defaultClassification.specificEpithet',
          'acceptedName.specificEpithet',
          'synonyms.specificEpithet'
      ],
      'infraspecific_name' : [
          'defaultClassification.infraspecificEpithet',
          'acceptedName.infraspecificEpithet',
          'synonyms.infraspecificEpithet'
      ],
      'common_name' : [
          'vernacularNames.name'
      ],
      'kingdom' : [
          'defaultClassification.kingdom'
      ],
      'source' : [
          'sourceSystem.code'
      ],
      'scientific_name' : [
        'acceptedName.fullScientificName'
      ]
    }
    
    
  }

  constructor(
    protected api: ApiService,
    protected utility: UtilityService,
    protected dialog: DialogService,
    private matdialog: MatDialog, 
    private formBuilder: UntypedFormBuilder,
    private translate: TranslateService
    ) {
      translate.setDefaultLang('en');

     }

  ngOnInit(): void {
  
    this.run_query('https://api.biodiversitydata.nl/v2/specimen/query/?identifications.defaultClassification.genus=Panthera', this.data, 'specimens');
    this.run_query('https://api.biodiversitydata.nl/v2/multimedia/query/?identifications.defaultClassification.genus=Panthera', this.data, 'multimedia');
    this.run_query('https://api.biodiversitydata.nl/v2/taxon/query/?defaultClassification.genus=Panthera', this.data, 'taxa');
  }

  protected change_language(lang: string) {
    this.translate.use(lang);
  }
  
  protected process_form(form_values){
    // Empty the data form to be ready for receiving
    this.empty_data();
    // Create a new query spec that we will fill and send to the API
    let query_spec = this.create_new_query_spec()

    // If the basic search has been utilised, put its value in all other values and run the queries
    let basic_term : string = form_values.basic_term
    if ( basic_term != '' ) {
      delete form_values['basic_term']; 
      for ( let item in form_values ) {
        form_values[item] = basic_term
      }
    }
   
    // First, delete all empty entries from the form_values object
    let search_for_values : object = this.delete_empty_object_items(form_values);
    search_for_values = this.split_form_entries_on_whitespace(search_for_values);

    // Now process each of the databases
    if ( this.search_in['specimens'] ) {
      let specimen_values = this.filter_form_on_database(search_for_values, 'specimens');
      let query_spec = this.create_new_query_spec()
      // Loop through each form field and create an object with all api calls
      for (let search_field in specimen_values){
        let new_condition = this.handle_search_form_field(search_field, specimen_values[search_field], 'specimens');
        // Add here new condition to list
        query_spec['conditions'].push(new_condition[0]);
      }
      query_spec['logicalOperator'] = this.operator;
      console.log('query1', query_spec)
      let query = this.URL_SPECIMEN + encodeURIComponent(JSON.stringify(query_spec));
      this.run_query(query, this.data, 'specimens')
    }

    // if ( this.search_in['taxa'] ) {
    if ( this.search_in['taxa'] ) {
      let taxa_values = this.filter_form_on_database(search_for_values, 'taxa');
      let query_spec = this.create_new_query_spec()
      // Loop through each form field and create an object with all api calls
      for (let search_field in taxa_values){
        let new_condition = this.handle_search_form_field(search_field, taxa_values[search_field], 'taxa');
        // Add here new condition to list
        query_spec['conditions'].push(new_condition[0]);
      }
      query_spec['logicalOperator'] = this.operator;
      let query = this.URL_TAXA + encodeURIComponent(JSON.stringify(query_spec));
      console.log('query2', query_spec)
      this.run_query(query, this.data, 'taxa')
    }
    //   let taxa_values = this.filter_form_on_database(search_for_values, 'taxa');
    //   let query = this.create_query_spec(this.URL_TAXA, taxa_values, 'taxa')
    //   this.run_query(query, this.data, 'taxa')
    // }

    // if ( this.search_in['multimedia'] ) {
    if ( this.search_in['multimedia'] ) {
      let multimedia_values = this.filter_form_on_database(search_for_values, 'multimedia');
      let query_spec = this.create_new_query_spec()
      // Loop through each form field and create an object with all api calls
      for (let search_field in multimedia_values){
        let new_condition = this.handle_search_form_field(search_field, multimedia_values[search_field], 'multimedia');
        // Add here new condition to list
        query_spec['conditions'].push(new_condition[0]);
      }
      query_spec['logicalOperator'] = this.operator;
      console.log('query3', query_spec)
      let query = this.URL_MULTIMEDIA + encodeURIComponent(JSON.stringify(query_spec));
      this.run_query(query, this.data, 'multimedia')
    }
    //   let multimedia_values = this.filter_form_on_database(search_for_values, 'multimedia');
    //   let query = this.create_query_spec(this.URL_MULTIMEDIA, multimedia_values, 'multimedia')
    //   this.run_query(query, this.data, 'multimedia')
    // }    
  }

  /**
   * This function creates an object representing all searches that have to be made. For each needed
   * api call, we record the accompanying search term and search field. This will be used to create a query.
   * @param search_field 
   * @param values 
   */
  private handle_search_form_field(search_field, values, category){
    let first : boolean = true;
    let condition = [];
    // Loop through all key words in the search field
    for (let i in values){
      let keyword = values[i]
      // Now for each keyword, create an entry for the keyword, search field and api key
      if ( first ) {
        // For the first keyword we create a normal condition
        first = false;
        condition = this.create_condition_for_word(category, search_field, keyword, 'or');
      }
      else{
        // Now the subsequent keywords need to have the AND operator with the first and other search terms
        condition[0]['and'] = this.create_condition_for_word(category, search_field, keyword, 'or');
      }
    }
    return condition;
  }

  private create_condition_for_word(category, search_field, word, field_to_add_to){
    // Now for each api lookup, create a query condition      
    let first : boolean = true;
    let saved_primary_condition_field : string;

    let condition = []

    for (let api_key in this.nba_field_mapping[category][search_field]){
      // If we have multiple lookup keys, we need to put these in one nested condition, in which the first is
      // a normal condition and the subsequent ones are conditions in the 'or' list of the first.
      if ( first ) {
        first = false;
        // For the first entry, create a normal query condition
        condition.push(
          this.create_query_condition(
            this.nba_field_mapping[category][search_field][api_key], // Retrieve the api lookup call for the current item
            this.search_form_operator[search_field], 
            word // Provide the value which we are searching for
          )
        );
        // Save the condition field to allow nesting in the correct query spec
        saved_primary_condition_field = this.nba_field_mapping[category][search_field][api_key] 
      }
      else {
        // For each subsequent condition, put the new condition in the 'or' field of the first
        let nestable_query_spec = this.find_condition_to_nest_in(condition, saved_primary_condition_field);
        nestable_query_spec[field_to_add_to].push(
          this.create_query_condition(
            this.nba_field_mapping[category][search_field][api_key], // Retrieve the api lookup call for the current item
            this.search_form_operator[search_field], 
            word // Provide the value which we are searching for
          )
        );
      }
    }
    return condition;
  }

  private create_new_query_spec(): object {
    return structuredClone(this.query_spec_template);
  }

  private find_condition_to_nest_in(condition, condition_field_name) {
    return condition.find(i => i.field === condition_field_name);
  }

  private create_query_condition(
    field : string, 
    operator : string, 
    value : string
  ){
    let query_condition = structuredClone(this.query_condition_template);
    
    query_condition['field'] = field
    query_condition['operator'] = operator
    query_condition['value'] = value
    // query_condition[''] = []

    return query_condition
  }

  protected run_query(query, object, field){
    this.spinners[field] = true;
    this.api.bioportal(query).subscribe(
      data => {
        object[field] = data
        console.log('found data', data)
        this.spinners[field] = false;

    });

  }

  protected test(thing): void{
    console.log('############ TESTING ############')
    console.log('test', this.search_form.value);
  }

  /**
   * Function to handle the settings dialog. Will save changes via the oscc_settings object
   * @author Ycreak
   */
  public open_dialog(data, category): void {
    this.dialog.open(data, category)
  }

  private delete_empty_object_items(given_object: object): object {
    let object = structuredClone(given_object);

    for (let item in object){
      if ( object[item] == '') {
        delete object[item]; 
      }
    }
    return object;
  }

  private split_form_entries_on_whitespace(given_object : object): object{
    let object = structuredClone(given_object);
    
    for (let item in object){
      object[item] = object[item].split([' ']);
    }
    return object;    
  }

  private filter_form_on_database(given_object : object, category : string): object {
    let object = structuredClone(given_object);
    
    for (let item in object){
      // First, check whether the item exists in the category, otherwise dont bother searching
      if ( !(item in this.nba_field_mapping[category]) ){
        delete object[item]; 
      }
    }
    return object;
  }

  protected set_form_field_operator(field : string, operator : string): void {
    this.search_form_operator[field] = operator;
  }

  private empty_data(): void {
    this.data = {
      'specimens' : {},
      'taxa' : {},
      'multimedia' : {},
    }
  }
}