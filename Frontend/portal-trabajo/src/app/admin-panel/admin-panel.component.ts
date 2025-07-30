import { Component, OnInit, ChangeDetectionStrategy, signal } from "@angular/core";
import { FooterComponent } from "../footer/footer.component";
import { HeaderComponent } from "../header/header.component";
import { ReportsComponent } from "../reports/reports.component";
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatExpansionModule } from '@angular/material/expansion';

@Component({
    selector: 'app-postulation-list',
    imports: [FooterComponent, HeaderComponent, ReportsComponent, MatExpansionModule, MatTooltipModule],
    templateUrl: './admin-panel.component.html',
    styleUrl: './admin-panel.component.scss',
    providers: [],
    changeDetection: ChangeDetectionStrategy.OnPush,
})

export class AdminPanelComponent implements OnInit {
    ngOnInit(): void {

    }

    readonly panelOpenState = signal(false);
}