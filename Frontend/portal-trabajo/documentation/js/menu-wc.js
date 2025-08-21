'use strict';

customElements.define('compodoc-menu', class extends HTMLElement {
    constructor() {
        super();
        this.isNormalMode = this.getAttribute('mode') === 'normal';
    }

    connectedCallback() {
        this.render(this.isNormalMode);
    }

    render(isNormalMode) {
        let tp = lithtml.html(`
        <nav>
            <ul class="list">
                <li class="title">
                    <a href="index.html" data-type="index-link">portal-trabajo documentation</a>
                </li>

                <li class="divider"></li>
                ${ isNormalMode ? `<div id="book-search-input" role="search"><input type="text" placeholder="Type to search"></div>` : '' }
                <li class="chapter">
                    <a data-type="chapter-link" href="index.html"><span class="icon ion-ios-home"></span>Getting started</a>
                    <ul class="links">
                        <li class="link">
                            <a href="overview.html" data-type="chapter-link">
                                <span class="icon ion-ios-keypad"></span>Overview
                            </a>
                        </li>
                        <li class="link">
                            <a href="index.html" data-type="chapter-link">
                                <span class="icon ion-ios-paper"></span>README
                            </a>
                        </li>
                                <li class="link">
                                    <a href="dependencies.html" data-type="chapter-link">
                                        <span class="icon ion-ios-list"></span>Dependencies
                                    </a>
                                </li>
                                <li class="link">
                                    <a href="properties.html" data-type="chapter-link">
                                        <span class="icon ion-ios-apps"></span>Properties
                                    </a>
                                </li>
                    </ul>
                </li>
                    <li class="chapter modules">
                        <a data-type="chapter-link" href="modules.html">
                            <div class="menu-toggler linked" data-bs-toggle="collapse" ${ isNormalMode ?
                                'data-bs-target="#modules-links"' : 'data-bs-target="#xs-modules-links"' }>
                                <span class="icon ion-ios-archive"></span>
                                <span class="link-name">Modules</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                        </a>
                        <ul class="links collapse " ${ isNormalMode ? 'id="modules-links"' : 'id="xs-modules-links"' }>
                            <li class="link">
                                <a href="modules/AppModule.html" data-type="entity-link" >AppModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-AppModule-286180474b9db8b2c841c17753f605a44994818ec1b9abf8d03edbea46602027230944084a52d7784b9ebeff07bc49b1149521572d1df4a1c7fa684f00f7029d"' : 'data-bs-target="#xs-components-links-module-AppModule-286180474b9db8b2c841c17753f605a44994818ec1b9abf8d03edbea46602027230944084a52d7784b9ebeff07bc49b1149521572d1df4a1c7fa684f00f7029d"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-AppModule-286180474b9db8b2c841c17753f605a44994818ec1b9abf8d03edbea46602027230944084a52d7784b9ebeff07bc49b1149521572d1df4a1c7fa684f00f7029d"' :
                                            'id="xs-components-links-module-AppModule-286180474b9db8b2c841c17753f605a44994818ec1b9abf8d03edbea46602027230944084a52d7784b9ebeff07bc49b1149521572d1df4a1c7fa684f00f7029d"' }>
                                            <li class="link">
                                                <a href="components/AppComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AppComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                </ul>
                </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#components-links"' :
                            'data-bs-target="#xs-components-links"' }>
                            <span class="icon ion-md-cog"></span>
                            <span>Components</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="components-links"' : 'id="xs-components-links"' }>
                            <li class="link">
                                <a href="components/AcademicBackgroundComponent.html" data-type="entity-link" >AcademicBackgroundComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/AcademicBackgroundEditComponent.html" data-type="entity-link" >AcademicBackgroundEditComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/AdminPanelComponent.html" data-type="entity-link" >AdminPanelComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/AppComponent.html" data-type="entity-link" >AppComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/AttatchCvComponent.html" data-type="entity-link" >AttatchCvComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/BigLogoComponent.html" data-type="entity-link" >BigLogoComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/CvUploaderComponent.html" data-type="entity-link" >CvUploaderComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/DeleteDialogComponent.html" data-type="entity-link" >DeleteDialogComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/EmployeeFormComponent.html" data-type="entity-link" >EmployeeFormComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/EmployeeProfileComponent.html" data-type="entity-link" >EmployeeProfileComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/EmployeerProfileFormComponent.html" data-type="entity-link" >EmployeerProfileFormComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/EmployerProfileComponent.html" data-type="entity-link" >EmployerProfileComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/EmployerProfileSidebarComponent.html" data-type="entity-link" >EmployerProfileSidebarComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/FileUploaderComponent.html" data-type="entity-link" >FileUploaderComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/FilterComponent.html" data-type="entity-link" >FilterComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/FooterComponent.html" data-type="entity-link" >FooterComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/FormSelectorComponent.html" data-type="entity-link" >FormSelectorComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/HeaderComponent.html" data-type="entity-link" >HeaderComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/JobOfferFormComponent.html" data-type="entity-link" >JobOfferFormComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/LandingComponent.html" data-type="entity-link" >LandingComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/LoginComponent.html" data-type="entity-link" >LoginComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/PostulateDialogComponent.html" data-type="entity-link" >PostulateDialogComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/PostulationDetailComponent.html" data-type="entity-link" >PostulationDetailComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/PostulationListComponent.html" data-type="entity-link" >PostulationListComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/ProfileComponent.html" data-type="entity-link" >ProfileComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/ProfileFormComponent.html" data-type="entity-link" >ProfileFormComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/ProfilePictureComponent.html" data-type="entity-link" >ProfilePictureComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/ProfileSelectorComponent.html" data-type="entity-link" >ProfileSelectorComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/ProgressSpinner.html" data-type="entity-link" >ProgressSpinner</a>
                            </li>
                            <li class="link">
                                <a href="components/RecoveryComponent.html" data-type="entity-link" >RecoveryComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/ReportsComponent.html" data-type="entity-link" >ReportsComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/ResetPasswordComponent.html" data-type="entity-link" >ResetPasswordComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/TrainingLinkComponent.html" data-type="entity-link" >TrainingLinkComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/WorkExperienceComponent.html" data-type="entity-link" >WorkExperienceComponent</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#classes-links"' :
                            'data-bs-target="#xs-classes-links"' }>
                            <span class="icon ion-ios-paper"></span>
                            <span>Classes</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="classes-links"' : 'id="xs-classes-links"' }>
                            <li class="link">
                                <a href="classes/AppUtils.html" data-type="entity-link" >AppUtils</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#injectables-links"' :
                                'data-bs-target="#xs-injectables-links"' }>
                                <span class="icon ion-md-arrow-round-down"></span>
                                <span>Injectables</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="injectables-links"' : 'id="xs-injectables-links"' }>
                                <li class="link">
                                    <a href="injectables/AdminService.html" data-type="entity-link" >AdminService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/AuthService.html" data-type="entity-link" >AuthService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/EmployeeService.html" data-type="entity-link" >EmployeeService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/EmployerService.html" data-type="entity-link" >EmployerService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/OfferService.html" data-type="entity-link" >OfferService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/PaginatorIntl.html" data-type="entity-link" >PaginatorIntl</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/ReportsService.html" data-type="entity-link" >ReportsService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/RouteTranslationService.html" data-type="entity-link" >RouteTranslationService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/UserService.html" data-type="entity-link" >UserService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/VisitTrackingService.html" data-type="entity-link" >VisitTrackingService</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#interfaces-links"' :
                            'data-bs-target="#xs-interfaces-links"' }>
                            <span class="icon ion-md-information-circle-outline"></span>
                            <span>Interfaces</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? ' id="interfaces-links"' : 'id="xs-interfaces-links"' }>
                            <li class="link">
                                <a href="interfaces/AcademicBackground.html" data-type="entity-link" >AcademicBackground</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/DeleteDialogData.html" data-type="entity-link" >DeleteDialogData</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Employee.html" data-type="entity-link" >Employee</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Employer.html" data-type="entity-link" >Employer</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/EmployerPostulation.html" data-type="entity-link" >EmployerPostulation</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/JobOffer.html" data-type="entity-link" >JobOffer</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Notification.html" data-type="entity-link" >Notification</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/NotificationOffer.html" data-type="entity-link" >NotificationOffer</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/PostulateDialogData.html" data-type="entity-link" >PostulateDialogData</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Postulation.html" data-type="entity-link" >Postulation</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Profile.html" data-type="entity-link" >Profile</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/User.html" data-type="entity-link" >User</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/WorkExperience.html" data-type="entity-link" >WorkExperience</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#miscellaneous-links"'
                            : 'data-bs-target="#xs-miscellaneous-links"' }>
                            <span class="icon ion-ios-cube"></span>
                            <span>Miscellaneous</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="miscellaneous-links"' : 'id="xs-miscellaneous-links"' }>
                            <li class="link">
                                <a href="miscellaneous/functions.html" data-type="entity-link">Functions</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/variables.html" data-type="entity-link">Variables</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <a data-type="chapter-link" href="coverage.html"><span class="icon ion-ios-stats"></span>Documentation coverage</a>
                    </li>
                    <li class="divider"></li>
                    <li class="copyright">
                        Documentation generated using <a href="https://compodoc.app/" target="_blank" rel="noopener noreferrer">
                            <img data-src="images/compodoc-vectorise.png" class="img-responsive" data-type="compodoc-logo">
                        </a>
                    </li>
            </ul>
        </nav>
        `);
        this.innerHTML = tp.strings;
    }
});