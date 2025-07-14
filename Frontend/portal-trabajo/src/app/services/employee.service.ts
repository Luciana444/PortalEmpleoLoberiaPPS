import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { JobOffer } from '../../models/jobOffer.model';

const URL = 'http://localhost:3000/api';

@Injectable({
    providedIn: 'root'
})
export class EmployerService {
    constructor(private httpClient: HttpClient) { }

}