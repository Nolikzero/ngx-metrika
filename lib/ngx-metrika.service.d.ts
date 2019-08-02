import { EventEmitter, RendererFactory2 } from '@angular/core';
import { Router } from '@angular/router';
import { MetrikaGoalEventOptions, MetrikaHitEventOptions, NgxMetrikaConfig } from './interfaces';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
/** @dynamic */
export declare class NgxMetrikaService {
    private router;
    private document;
    defaultConfig: NgxMetrikaConfig;
    config: NgxMetrikaConfig;
    debug: boolean;
    previousUrl: string;
    private renderer;
    hit: EventEmitter<MetrikaHitEventOptions>;
    reachGoal: BehaviorSubject<MetrikaGoalEventOptions>;
    constructor(ymConfig: NgxMetrikaConfig, router: Router, rendererFactory: RendererFactory2, document: Document);
    static getCounterNameById(id: string | number): string;
    static getCounterById(id: any): any;
    configure(config: NgxMetrikaConfig): void;
    private onHit;
    private onReachGoal;
    private insertMetrika;
    checkCounter(id: string | number): Promise<any>;
}
