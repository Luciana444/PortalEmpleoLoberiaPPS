import { Component, OnInit, ChangeDetectionStrategy, signal } from "@angular/core";
import { FooterComponent } from "../footer/footer.component";
import { HeaderComponent } from "../header/header.component";
import { ReportsComponent } from "../reports/reports.component";
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatExpansionModule } from '@angular/material/expansion';
import { JobOffer } from "../../models/jobOffer.model";
import { ActivatedRoute, Router } from "@angular/router";
import { AuthService } from "../services/auth.service";
import { ReportsService } from "../services/reports.service";
import { AdminService } from "../services/admin.service";
import { AppUtils } from "../../utils/app.utils";
import { MatDivider } from "@angular/material/divider";
import { Employee } from "../../models/employee.model";
import { Employer } from "../../models/employer.model";


@Component({
    selector: 'app-postulation-list',
    imports: [FooterComponent, HeaderComponent, ReportsComponent, MatExpansionModule, MatTooltipModule, MatDivider],
    templateUrl: './admin-panel.component.html',
    styleUrl: './admin-panel.component.scss',
    providers: [],
    changeDetection: ChangeDetectionStrategy.OnPush,
})

export class AdminPanelComponent implements OnInit {
    itemId: string = "";
    offers: JobOffer[] = [];
    employees: Employee[] = [];
    employers: Employer[] = [];

    constructor(
        private authService: AuthService,
        private router: Router,
        private route: ActivatedRoute,
        private reportsservice: ReportsService,
        private adminservice: AdminService,
    ) { }

    ngOnInit(): void {
        this.getOffers();
        this.getEmployees();
        this.getEmployers();

    }

    readonly panelOpenState = signal(false);

    getOffers() {
        this.adminservice.getOffersLikeAdmin().subscribe({
            next: (response) => {
                if (response.status === 200) { // Populate form with API data
                    this.offers = response.body || [];
                } else {
                    console.log('No se pudo cargar oferta', response);
                }
            },
            error: (err) => {
                console.error('Error al cargar oferta', err);
            }
        });
    }

    getEmployees() {
        this.adminservice.getEmployeesLikeAdmin().subscribe({
            next: (response) => {
                if (response.status === 200) { // Populate form with API data
                    this.employees = response.body || [];
                } else {
                    console.log('No se pudo cargar ciudadanos', response);
                }
            },
            error: (err) => {
                console.error('Error al cargar ciudadano', err);
            }
        });
    }

    getEmployers() {
        this.adminservice.getEmployersLikeAdmin().subscribe({
            next: (response) => {
                if (response.status === 200) { // Populate form with API data
                    this.employers = response.body || [];
                } else {
                    console.log('No se pudo cargar empresas', response);
                }
            },
            error: (err) => {
                console.error('Error al cargar empresa', err);
            }
        });
    }


    getImageUrl(image_url: string) {
        return image_url ? `http://localhost:3000${image_url}` : null;
    }

    navigateToPostulationDetail(id: any) {
        this.router.navigate(['/detail', id], { state: { from: this.router.url } });
    }

    navigateToProfile(id: any) {
        this.router.navigate(['/employee-profile', id], { state: { from: this.router.url } });
    }

      navigateToProfileEmployer(id: any) {
        this.router.navigate(['/employer-profile', id], { state: { from: this.router.url } });
    }

    convertToLocalDate(date: string | undefined) {
        if (date)
            return AppUtils.convertToLocalString(date);

        return "";
    }
}




