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


@Component({
    selector: 'app-postulation-list',
    imports: [FooterComponent, HeaderComponent, ReportsComponent, MatExpansionModule, MatTooltipModule],
    templateUrl: './admin-panel.component.html',
    styleUrl: './admin-panel.component.scss',
    providers: [],
    changeDetection: ChangeDetectionStrategy.OnPush,
})

export class AdminPanelComponent implements OnInit {
    itemId: string = "";
    offers: JobOffer[] = [];

    constructor(
        private authService: AuthService,
        private router: Router,
        private route: ActivatedRoute,
        private reportsservice: ReportsService,
        private adminservice: AdminService,
    ) { }

    ngOnInit(): void {
        this.getOffers();

    }

    readonly panelOpenState = signal(false);

    getOffers() {
        //this.itemId = this.route.snapshot.params['id'] ?? ""; // Get ID from route
        //if (this.itemId) {
            this.adminservice.getOffersLikeAdmin().subscribe({
                next: (response) => {
                    if (response.status === 200) { // Populate form with API data
                        this.offers = response.body || [];
                    } else {
                        console.log('No se pudo cargar oferta', response);
                    }
                },
                error: (err) => {
                    //this.toastr.error(err.error.error, 'Ocurrió un error');
                    console.error('Error al cargar oferta', err);
                }
            });
        //}
    }

    getImageUrl(image_url: string) {
    return image_url ? `http://localhost:3000${image_url}` : null;
  }

  navigateToPostulationDetail(id: any) {
    this.router.navigate(['/detail', id], { state: { from: this.router.url } });
  }
}




