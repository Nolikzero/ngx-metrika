import { NgxMetrikaService } from './ngx-metrika.service';
import { AfterViewInit, ElementRef, Renderer2 } from '@angular/core';
export declare class NgxMetrikaGoalDirective implements AfterViewInit {
    private ym;
    private renderer;
    private el;
    trackOn: string;
    target: string;
    params: any;
    callback: () => void;
    constructor(ym: NgxMetrikaService, renderer: Renderer2, el: ElementRef);
    ngAfterViewInit(): void;
}
