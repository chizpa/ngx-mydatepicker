import { Component, ElementRef, ViewEncapsulation, ViewChild, Renderer, ChangeDetectorRef, OnDestroy } from "@angular/core";
import { IMyDate, IMyMonth, IMyCalendarDay, IMyCalendarMonth, IMyCalendarYear, IMyWeek, IMyOptions, IMySelectorPosition } from "./interfaces/index";
import { UtilService } from "./services/ngx-my-date-picker.util.service";
import { KeyCode } from "./enums/key-code.enum";
import { MonthId } from "./enums/month-id.enum";

/*
declare var require: any;
const myDpStyles: string = require("./ngx-my-date-picker.component.css");
const myDpTpl: string = require("./ngx-my-date-picker.component.html");
*/

@Component({
    selector: "ngx-my-date-picker",
    styles: [`.ngxmdp .headertodaybtn,.ngxmdp .monthcell,.ngxmdp .weekdaytitle{overflow:hidden;white-space:nowrap}.ngxmdp *{-moz-box-sizing:border-box;-webkit-box-sizing:border-box;box-sizing:border-box;font-family:Arial,Helvetica,sans-serif;padding:0;margin:0}.ngxmdp .selector{position:absolute;padding:0;border:1px solid #aaa;border-radius:4px;z-index:100000;animation:selectorfadein 60ms;height:250px}.ngxmdp .selector:focus{border:1px solid #aaa;outline:0}@keyframes selectorfadein{from{opacity:0}to{opacity:1}}.ngxmdp .selectorarrow{background:#fff;padding:0}.ngxmdp .selectorarrow:after,.ngxmdp .selectorarrow:before{bottom:100%;border:solid transparent;content:" ";height:0;width:0;position:absolute}.ngxmdp .selectorarrow:after{border-color:rgba(250,250,250,0);border-bottom-color:#fff;border-width:9px;margin-left:-9px}.ngxmdp .selectorarrow:before{border-color:rgba(204,204,204,0);border-bottom-color:#aaa;border-width:11px;margin-left:-11px}.ngxmdp .selectorarrow:focus:before{border-bottom-color:#aaa}.ngxmdp .selectorarrowleft:after,.ngxmdp .selectorarrowleft:before{left:24px}.ngxmdp .selectorarrowright:after,.ngxmdp .selectorarrowright:before{left:86%}.ngxmdp ::-ms-clear{display:none}.ngxmdp .headerbtnenabled,.ngxmdp .headertodaybtnenabled,.ngxmdp .yearchangebtnenabled{cursor:pointer}.ngxmdp .headerbtndisabled,.ngxmdp .headertodaybtndisabled,.ngxmdp .yearchangebtndisabled{cursor:not-allowed;opacity:.65}.ngxmdp .headertodaybtn{background:#FFF}.ngxmdp .header{width:100%;height:30px;border-radius:4px 4px 0 0;background-color:#FFF;margin-bottom:10px;margin-top:5px}.ngxmdp .header td{vertical-align:middle;border:none;line-height:0}.ngxmdp .header td:nth-child(1){padding-left:4px}.ngxmdp .header td:nth-child(2){text-align:center}.ngxmdp .header td:nth-child(3){padding-right:4px}.ngxmdp .caltable,.ngxmdp .monthtable,.ngxmdp .yeartable{border-radius:0 0 4px 4px;table-layout:fixed;width:100%;height:80%;background-color:#FFF;font-size:14px}.ngxmdp .caltable tbody tr:nth-child(6) td:first-child,.ngxmdp .monthtable tbody tr:nth-child(4) td:first-child,.ngxmdp .yeartable tbody tr:nth-child(7) td:first-child{border-bottom-left-radius:4px}.ngxmdp .caltable tbody tr:nth-child(6) td:last-child,.ngxmdp .monthtable tbody tr:nth-child(4) td:last-child,.ngxmdp .yeartable tbody tr:nth-child(7) td:last-child{border-bottom-right-radius:4px}.ngxmdp .caltable,.ngxmdp .daycell,.ngxmdp .monthcell,.ngxmdp .monthtable,.ngxmdp .weekdaytitle,.ngxmdp .yearcell,.ngxmdp .yeartable{border-collapse:collapse;color:#036;line-height:1.1}.ngxmdp .daycell,.ngxmdp .monthcell,.ngxmdp .weekdaytitle,.ngxmdp .yearcell{padding:0;text-align:center}.ngxmdp .weekdaytitle{font-size:11px;font-weight:400;vertical-align:middle;max-width:36px;padding-bottom:5px}.ngxmdp .weekdaytitleweeknbr{width:30px}.ngxmdp .monthcell{background-color:#FFF}.ngxmdp .yearcell{background-color:#FFF;width:20%}.ngxmdp .daycell .datevalue{background-color:inherit}.ngxmdp .daycell .datevalue span{font-size:12px}.ngxmdp .daycellweeknbr{font-size:10px;cursor:default;color:#4d4d4d;font-style:italic}.ngxmdp .nextmonth,.ngxmdp .prevmonth{opacity:.5}.ngxmdp .disabled{cursor:default!important;color:#aaa!important;background:#FFF!important}.ngxmdp .currmonth{background-color:#FFF;font-weight:400}.ngxmdp .markdate{position:absolute;width:4px;height:4px;border-radius:4px}.ngxmdp .markcurrday,.ngxmdp .selectedday .datevalue{height:28px;width:28px;align-items:center;margin-left:1px;margin-top:-10px;margin-bottom:-10px;display:flex}.ngxmdp .markcurrday{border:1px solid #2970B2;border-radius:50%;justify-content:center}.ngxmdp .selectedday .datevalue{border:none;background-color:#2970B2;border-radius:50%;color:#fff;justify-content:center}.ngxmdp .markcurrmonth{display:flex;align-items:center;justify-content:center;border:1px solid #2970B2;height:100%;border-radius:5px}.ngxmdp .selectedmonth .monthvalue,.ngxmdp .selectedyear .yearvalue{border:none;background-color:#2970B2;color:#fff;height:100%;display:flex;margin-left:1px;margin-top:-10px;margin-bottom:-10px}.ngxmdp .selectedmonth .monthvalue{border-radius:5px;align-items:center;justify-content:center}.ngxmdp .markcurryear{display:flex;align-items:center;justify-content:center;border:1px solid #2970B2;height:100%;border-radius:5px}.ngxmdp .selectedyear .yearvalue{border-radius:5px;align-items:center;justify-content:center}.ngxmdp .headerbtncell{background-color:#FFF;display:table-cell;vertical-align:middle}.ngxmdp .yearchangebtncell{text-align:center;background-color:#FFF}.ngxmdp .headerbtn,.ngxmdp .headerlabelbtn,.ngxmdp .yearchangebtn{background:#FFF;border:none;height:22px}.ngxmdp .headerbtn{width:16px}.ngxmdp .headerlabelbtn{font-size:14px;outline:0;cursor:default}.ngxmdp .headerlabelbtnnotedit{cursor:default}.ngxmdp .headertodaybtn{border:1px solid #aaa;padding:0 4px;border-radius:4px;font-size:11px;height:28px;min-width:60px;max-width:84px}.ngxmdp .headerbtn,.ngxmdp .headermonthtxt,.ngxmdp .headertodaybtn,.ngxmdp .headeryeartxt,.ngxmdp .yearchangebtn{color:#000}.ngxmdp button::-moz-focus-inner{border:0}.ngxmdp .headermonthtxt,.ngxmdp .headeryeartxt{text-align:center;display:table-cell;vertical-align:middle;font-size:14px;height:26px;width:40px;max-width:40px;overflow:hidden;white-space:nowrap}.ngxmdp .headertodaybtn:focus{background:#aaa}.ngxmdp .headerbtn:focus,.ngxmdp .monthlabel:focus,.ngxmdp .yearchangebtn:focus,.ngxmdp .yearlabel:focus{color:#474747;outline:0}.ngxmdp .daycell:focus,.ngxmdp .monthcell:focus,.ngxmdp .yearcell:focus{outline:#E9E9E9 solid 0}.ngxmdp .icon-ngxmydpdown,.ngxmdp .icon-ngxmydpleft,.ngxmdp .icon-ngxmydpright,.ngxmdp .icon-ngxmydpup{color:#222;font-size:20px}.ngxmdp .icon-ngxmydptoday{color:#222;font-size:11px}.ngxmdp table{display:table;border-spacing:0}.ngxmdp table td{padding:0}.ngxmdp table,.ngxmdp td,.ngxmdp th{border:none}.ngxmdp .headertodaybtnenabled:hover{background-color:#E9E9E9}.ngxmdp .tablesinglemonth:hover,.ngxmdp .tablesingleyear:hover{background-color:#E9E9E9;border-radius:5px;margin:15px}.ngxmdp .tablesingleday:hover{background-color:#E9E9E9;border-radius:50%}.ngxmdp .daycell,.ngxmdp .monthcell,.ngxmdp .monthlabel,.ngxmdp .yearcell,.ngxmdp .yearlabel{cursor:pointer;color:#303030}.ngxmdp .headerbtnenabled:hover,.ngxmdp .monthlabel:hover,.ngxmdp .yearchangebtnenabled:hover,.ngxmdp .yearlabel:hover{color:#474747}.ngxmdp .daycell_container{width:28px;height:28px;display:flex;align-items:center;justify-content:center;margin-left:4px}@font-face{font-family:mydate;src:url(data:application/octet-stream;base64,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) format('woff'),url(data:application/octet-stream;base64,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) format('truetype')}.ngxmdp .ngxmdpicon{font-family:mydate;font-style:normal;font-weight:400;font-variant:normal;text-transform:none;-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale}.ngxmdp .icon-ngxmydpright:before{content:'\\e802'}.ngxmdp .icon-ngxmydpleft:before{content:'\\e801'}.ngxmdp .icon-ngxmydpup:before{content:'\\e803'}.ngxmdp .icon-ngxmydpdown:before{content:'\\e800'}`],
    template: `<div class="ngxmdp"><div class="selector" #selectorEl [ngxfocus]="1" [ngStyle]="{'width': opts.selectorWidth, 'top': selectorPos.top, 'left': selectorPos.left}" [ngClass]="{'selectorarrow': opts.showSelectorArrow, 'selectorarrowleft': opts.showSelectorArrow&&!opts.alignSelectorRight, 'selectorarrowright': opts.showSelectorArrow&&opts.alignSelectorRight}" (keyup)="onCloseSelector($event)" tabindex="0"><table class="header"><tr><td><div style="float:left"><div class="headerbtncell"><button type="button" [attr.aria-label]="opts.ariaLabelPrevMonth" class="headerbtn ngxmdpicon icon-ngxmydpleft" (click)="onPrevMonth()" [disabled]="prevMonthDisabled" [ngClass]="{'headerbtnenabled': !prevMonthDisabled, 'headerbtndisabled': prevMonthDisabled}"></button></div><div class="headermonthtxt"><button class="headerlabelbtn" [ngClass]="{'monthlabel': opts.monthSelector, 'headerlabelbtnnotedit': !opts.monthSelector}" type="button" (click)="opts.monthSelector&&onSelectMonthClicked($event)" tabindex="{{opts.monthSelector?'0':'-1'}}">{{visibleMonth.monthTxt}}</button></div><div class="headerbtncell"><button type="button" [attr.aria-label]="opts.ariaLabelNextMonth" class="headerbtn ngxmdpicon icon-ngxmydpright" (click)="onNextMonth()" [disabled]="nextMonthDisabled" [ngClass]="{'headerbtnenabled': !nextMonthDisabled, 'headerbtndisabled': nextMonthDisabled}"></button></div></div></td><td><button *ngIf="opts.showTodayBtn" type="button" class="headertodaybtn" (click)="onTodayClicked()" [disabled]="disableTodayBtn" [ngClass]="{'headertodaybtnenabled': !disableTodayBtn, 'headertodaybtndisabled': disableTodayBtn}"><!-- <span class="ngxmdpicon icon-ngxmydptoday"></span> --> <span>{{opts.todayBtnTxt}}</span></button></td><td><div style="float:right"><div class="headerbtncell"><button type="button" [attr.aria-label]="opts.ariaLabelPrevYear" class="headerbtn ngxmdpicon icon-ngxmydpleft" (click)="onPrevYear()" [disabled]="prevYearDisabled" [ngClass]="{'headerbtnenabled': !prevYearDisabled, 'headerbtndisabled': prevYearDisabled}"></button></div><div class="headeryeartxt"><button class="headerlabelbtn" [ngClass]="{'yearlabel': opts.yearSelector, 'headerlabelbtnnotedit': !opts.yearSelector}" type="button" (click)="opts.yearSelector&&onSelectYearClicked($event)" tabindex="{{opts.yearSelector?'0':'-1'}}">{{visibleMonth.year}}</button></div><div class="headerbtncell"><button type="button" [attr.aria-label]="opts.ariaLabelNextYear" class="headerbtn ngxmdpicon icon-ngxmydpright" (click)="onNextYear()" [disabled]="nextYearDisabled" [ngClass]="{'headerbtnenabled': !nextYearDisabled, 'headerbtndisabled': nextYearDisabled}"></button></div></div></td></tr></table><table class="caltable" *ngIf="!selectMonth&&!selectYear"><thead><tr><th class="weekdaytitle weekdaytitleweeknbr" *ngIf="opts.showWeekNumbers&&opts.firstDayOfWeek==='mo'"></th><th class="weekdaytitle" scope="col" *ngFor="let d of weekDays">{{d}}</th></tr></thead><tbody><tr *ngFor="let w of dates"><td class="daycell daycellweeknbr" *ngIf="opts.showWeekNumbers&&opts.firstDayOfWeek==='mo'">{{w.weekNbr}}</td><td class="daycell" *ngFor="let d of w.week" tabindex="0"><div class="daycell_container" [ngClass]="{'currmonth':d.cmo===currMonthId&&!d.disabled, 'selectedday':selectedDate.day===d.dateObj.day && selectedDate.month===d.dateObj.month && selectedDate.year===d.dateObj.year && d.cmo===currMonthId, 'disabled': d.disabled, 'tablesingleday':(!opts.allowSelectionOnlyInCurrentMonth||d.cmo===currMonthId&&opts.allowSelectionOnlyInCurrentMonth)&&!d.disabled}" (click)="!d.disabled&&onCellClicked(d);$event.stopPropagation()" (keydown)="onCellKeyDown($event, d)"><div class="daycell_content"><div *ngIf="d.markedDate.marked" class="markdate" [ngStyle]="{'background-color': d.markedDate.color}"></div><div class="datevalue" [ngClass]="{'prevmonth':d.cmo===prevMonthId,'currmonth':d.cmo===currMonthId,'nextmonth':d.cmo===nextMonthId,'highlight':d.highlight}"><span [ngClass]="{'markcurrday':d.currDay&&opts.markCurrentDay, 'dimday': d.highlight && (d.cmo===prevMonthId || d.cmo===nextMonthId || d.disabled)}">{{d.dateObj.day}}</span></div></div></div></td></tr></tbody></table><table class="monthtable" *ngIf="selectMonth"><tbody><tr *ngFor="let mr of months"><td class="monthcell tablesinglemonth" [ngClass]="{'selectedmonth': m.selected, 'disabled': m.disabled}" *ngFor="let m of mr" (click)="!m.disabled&&onMonthCellClicked(m);$event.stopPropagation()" (keydown)="onMonthCellKeyDown($event, m)" tabindex="0"><div class="monthvalue" [ngClass]="{'markcurrmonth':m.currMonth&&opts.markCurrentMonth}">{{m.name}}</div></td></tr></tbody></table><table class="yeartable" *ngIf="selectYear"><tbody><tr><td colspan="3" class="yearchangebtncell" (click)="onPrevYears($event, years[0][0].year)"><button type="button" class="yearchangebtn ngxmdpicon icon-ngxmydpup" [disabled]="prevYearsDisabled" [ngClass]="{'yearchangebtnenabled': !prevYearsDisabled, 'yearchangebtndisabled': prevYearsDisabled}"></button></td></tr><tr *ngFor="let yr of years"><td class="yearcell tablesingleyear" [ngClass]="{'selectedyear': y.selected, 'disabled': y.disabled}" *ngFor="let y of yr" (click)="!y.disabled&&onYearCellClicked(y);$event.stopPropagation()" (keydown)="onYearCellKeyDown($event, y)" tabindex="0"><div class="yearvalue" [ngClass]="{'markcurryear':y.currYear&&opts.markCurrentYear}">{{y.year}}</div></td></tr><tr><td colspan="3" class="yearchangebtncell" (click)="onNextYears($event, years[0][0].year)"><button type="button" class="yearchangebtn ngxmdpicon icon-ngxmydpdown" [disabled]="nextYearsDisabled" [ngClass]="{'yearchangebtnenabled': !nextYearsDisabled, 'yearchangebtndisabled': nextYearsDisabled}"></button></td></tr></tbody></table></div></div>`,
    providers: [UtilService],
    encapsulation: ViewEncapsulation.None
})

export class NgxMyDatePicker implements OnDestroy {
    @ViewChild("selectorEl") selectorEl: any;
    opts: IMyOptions;
    visibleMonth: IMyMonth = {monthTxt: "", monthNbr: 0, year: 0};
    selectedMonth: IMyMonth = {monthTxt: "", monthNbr: 0, year: 0};
    selectedDate: IMyDate = {year: 0, month: 0, day: 0};
    weekDays: Array<string> = [];
    dates: Array<IMyWeek> = [];
    months: Array<Array<IMyCalendarMonth>> = [];
    years: Array<Array<IMyCalendarYear>> = [];
    disableTodayBtn: boolean = false;
    dayIdx: number = 0;
    weekDayOpts: Array<string> = ["su", "mo", "tu", "we", "th", "fr", "sa"];

    selectMonth: boolean = false;
    selectYear: boolean = false;

    dateChanged: Function;
    calendarViewChanged: Function;
    closedByEsc: Function;
    selectorPos: IMySelectorPosition = null;

    prevMonthDisabled: boolean = false;
    nextMonthDisabled: boolean = false;
    prevYearDisabled: boolean = false;
    nextYearDisabled: boolean = false;
    prevYearsDisabled: boolean = false;
    nextYearsDisabled: boolean = false;

    prevMonthId: number = MonthId.prev;
    currMonthId: number = MonthId.curr;
    nextMonthId: number = MonthId.next;

    clickListener: Function;

    constructor(public elem: ElementRef, private renderer: Renderer, private cdr: ChangeDetectorRef, private utilService: UtilService) {
        this.clickListener = renderer.listen(elem.nativeElement, "click", (evt: MouseEvent) => {
            if ((this.opts.monthSelector || this.opts.yearSelector) && evt.target) {
                this.resetMonthYearSelect();
            }
        });
    }

    ngOnDestroy(): void {
        this.clickListener();
    }

    initialize(opts: IMyOptions, defaultMonth: string, selectorPos: IMySelectorPosition, inputValue: string, dc: Function, cvc: Function, cbe: Function): void {
        this.opts = opts;
        this.selectorPos = selectorPos;
        this.weekDays.length = 0;

        this.isTodayDisabled();
        this.dayIdx = this.weekDayOpts.indexOf(this.opts.firstDayOfWeek);
        if (this.dayIdx !== -1) {
            let idx: number = this.dayIdx;
            for (let i = 0; i < this.weekDayOpts.length; i++) {
                this.weekDays.push(this.opts.dayLabels[this.weekDayOpts[idx]]);
                idx = this.weekDayOpts[idx] === "sa" ? 0 : idx + 1;
            }
        }

        let date: IMyDate = this.utilService.isDateValid(inputValue, this.opts.dateFormat, this.opts.minYear, this.opts.maxYear, this.opts.disableUntil, this.opts.disableSince, this.opts.disableWeekends, this.opts.disableDates, this.opts.disableDateRanges, this.opts.disableWeekdays, this.opts.monthLabels, this.opts.enableDates);
        if (date.day !== 0 && date.month !== 0 && date.year !== 0) {
            this.selectedDate = date;
        }
        else {
            if (defaultMonth !== null && defaultMonth !== undefined && defaultMonth !== "") {
                this.selectedMonth = this.utilService.parseDefaultMonth(defaultMonth);
            }
        }

        this.dateChanged = dc;
        this.calendarViewChanged = cvc;
        this.closedByEsc = cbe;

        this.setVisibleMonth();
    }

    setCalendarView(date: IMyDate): void {
        this.selectedDate = date;
        this.setVisibleMonth();
    }

    resetMonthYearSelect(): void {
        this.selectMonth = false;
        this.selectYear = false;
    }

    onSelectMonthClicked(event: any): void {
        event.stopPropagation();
        this.selectMonth = !this.selectMonth;
        this.selectYear = false;
        this.cdr.detectChanges();
        if (this.selectMonth) {
            let today: IMyDate = this.getToday();
            this.months.length = 0;
            for (let i = 1; i <= 12; i += 3) {
                let row: Array<IMyCalendarMonth> = [];
                for (let j = i; j < i + 3; j++) {
                    let disabled: boolean = this.utilService.isMonthDisabledByDisableUntil({year: this.visibleMonth.year, month: j, day: this.daysInMonth(j, this.visibleMonth.year)}, this.opts.disableUntil)
                        || this.utilService.isMonthDisabledByDisableSince({year: this.visibleMonth.year, month: j, day: 1}, this.opts.disableSince);
                    row.push({nbr: j, name: this.opts.monthLabels[j], currMonth: j === today.month && this.visibleMonth.year === today.year, selected: j === this.visibleMonth.monthNbr, disabled: disabled});
                }
                this.months.push(row);
            }
        }
    }

    onMonthCellClicked(cell: IMyCalendarMonth): void {
        let mc: boolean = cell.nbr !== this.visibleMonth.monthNbr;
        this.visibleMonth = {monthTxt: this.opts.monthLabels[cell.nbr], monthNbr: cell.nbr, year: this.visibleMonth.year};
        this.generateCalendar(cell.nbr, this.visibleMonth.year, mc);
        this.selectMonth = false;
        this.selectorEl.nativeElement.focus();
    }

    onMonthCellKeyDown(event: any, cell: IMyCalendarMonth) {
        if ((event.keyCode === KeyCode.enter || event.keyCode === KeyCode.space) && !cell.disabled) {
            event.preventDefault();
            this.onMonthCellClicked(cell);
        }
    }

    onSelectYearClicked(event: any): void {
        event.stopPropagation();
        this.selectYear = !this.selectYear;
        this.selectMonth = false;
        this.cdr.detectChanges();
        if (this.selectYear) {
            this.generateYears(this.visibleMonth.year);
        }
    }

    onYearCellClicked(cell: IMyCalendarYear): void {
        let yc: boolean = cell.year !== this.visibleMonth.year;
        this.visibleMonth = {monthTxt: this.visibleMonth.monthTxt, monthNbr: this.visibleMonth.monthNbr, year: cell.year};
        this.generateCalendar(this.visibleMonth.monthNbr, cell.year, yc);
        this.selectYear = false;
        this.selectorEl.nativeElement.focus();
    }

    onPrevYears(event: any, year: number): void {
        event.stopPropagation();

        this.generateYears(year + this.num_years_offset - this.num_of_year_rows);
    }

    onNextYears(event: any, year: number): void {
        event.stopPropagation();
        
        this.generateYears(year + this.num_years_offset + this.num_of_year_rows);
    }

    // How many columns and rows in the year selector
    // offset -> where to place current year in the list
    num_of_year_columns:number = 3;
    num_of_year_rows:number = 3;
    num_years_offset:number = 4;

    generateYears(year: number): void {

        this.years.length = 0;
        let today: IMyDate = this.getToday();
        let year_counter:number = 0;

        for (let i = 0; i < this.num_of_year_rows; i++) {
            let row: Array<IMyCalendarYear> = [];

            for (let j = 0; j < this.num_of_year_columns; j++) {
                let year_sum = year - this.num_years_offset + year_counter;

                let disabled: boolean = this.utilService.isMonthDisabledByDisableUntil({year: year_sum, month: this.visibleMonth.monthNbr, day: this.daysInMonth(this.visibleMonth.monthNbr, year_sum)}, this.opts.disableUntil)
                    || this.utilService.isMonthDisabledByDisableSince({year: year_sum, month: this.visibleMonth.monthNbr, day: 1}, this.opts.disableSince);
                let minMax: boolean = year_sum < this.opts.minYear || year_sum > this.opts.maxYear;

                row.push({year: year_sum, currYear: year_sum === today.year, selected: year_sum === this.visibleMonth.year, disabled: disabled || minMax});
                year_counter++;
            }
            this.years.push(row);
        }

        this.prevYearsDisabled = this.years[0][0].year <= this.opts.minYear || this.utilService.isMonthDisabledByDisableUntil({year: this.years[0][0].year - 1, month: this.visibleMonth.monthNbr, day: this.daysInMonth(this.visibleMonth.monthNbr, this.years[0][0].year - 1)}, this.opts.disableUntil);
        this.nextYearsDisabled = this.years[this.num_of_year_rows - 1][this.num_of_year_columns - 1].year >= this.opts.maxYear || this.utilService.isMonthDisabledByDisableSince({year: this.years[this.num_of_year_rows - 1][this.num_of_year_columns - 1].year + 1, month: this.visibleMonth.monthNbr, day: 1}, this.opts.disableSince);
    }

    onYearCellKeyDown(event: any, cell: IMyCalendarYear) {
        if ((event.keyCode === KeyCode.enter || event.keyCode === KeyCode.space) && !cell.disabled) {
            event.preventDefault();
            this.onYearCellClicked(cell);
        }
    }

    isTodayDisabled(): void {
        this.disableTodayBtn = this.utilService.isDisabledDate(this.getToday(), this.opts.minYear, this.opts.maxYear, this.opts.disableUntil, this.opts.disableSince, this.opts.disableWeekends, this.opts.disableDates, this.opts.disableDateRanges, this.opts.disableWeekdays, this.opts.enableDates);
    }

    setVisibleMonth(): void {
        // Sets visible month of calendar
        let y: number = 0, m: number = 0;
        if (this.selectedDate.year === 0 && this.selectedDate.month === 0 && this.selectedDate.day === 0) {
            if (this.selectedMonth.year === 0 && this.selectedMonth.monthNbr === 0) {
                let today: IMyDate = this.getToday();
                y = today.year;
                m = today.month;
            } else {
                y = this.selectedMonth.year;
                m = this.selectedMonth.monthNbr;
            }
        }
        else {
            y = this.selectedDate.year;
            m = this.selectedDate.month;
        }
        this.visibleMonth = {monthTxt: this.opts.monthLabels[m], monthNbr: m, year: y};

        // Create current month
        this.generateCalendar(m, y, true);
    }

    onPrevMonth(): void {
        // Previous month from calendar
        let d: Date = this.getDate(this.visibleMonth.year, this.visibleMonth.monthNbr, 1);
        d.setMonth(d.getMonth() - 1);

        let y: number = d.getFullYear();
        let m: number = d.getMonth() + 1;

        this.visibleMonth = {monthTxt: this.opts.monthLabels[m], monthNbr: m, year: y};
        this.generateCalendar(m, y, true);
    }

    onNextMonth(): void {
        // Next month from calendar
        let d: Date = this.getDate(this.visibleMonth.year, this.visibleMonth.monthNbr, 1);
        d.setMonth(d.getMonth() + 1);

        let y: number = d.getFullYear();
        let m: number = d.getMonth() + 1;

        this.visibleMonth = {monthTxt: this.opts.monthLabels[m], monthNbr: m, year: y};
        this.generateCalendar(m, y, true);
    }

    onPrevYear(): void {
        // Previous year from calendar
        this.visibleMonth.year--;
        this.generateCalendar(this.visibleMonth.monthNbr, this.visibleMonth.year, true);
    }

    onNextYear(): void {
        // Next year from calendar
        this.visibleMonth.year++;
        this.generateCalendar(this.visibleMonth.monthNbr, this.visibleMonth.year, true);
    }

    onCloseSelector(event: any): void {
        if (event.keyCode === KeyCode.esc) {
            this.closedByEsc();
        }
    }

    onTodayClicked(): void {
        // Today button clicked
        let today: IMyDate = this.getToday();
        this.selectDate(today);
        if (!this.opts.closeSelectorOnDateSelect) {
            this.setVisibleMonth();
        }
    }

    onCellClicked(cell: any): void {
        // Cell clicked on the calendar
        if (cell.cmo === this.prevMonthId) {
            // Previous month of day
            this.onPrevMonth();
            if (!this.opts.allowSelectionOnlyInCurrentMonth) {
                this.selectDate(cell.dateObj);
            }
        }
        else if (cell.cmo === this.currMonthId) {
            // Current month of day
            this.selectDate(cell.dateObj);
        }
        else if (cell.cmo === this.nextMonthId) {
            // Next month of day
            this.onNextMonth();
            if (!this.opts.allowSelectionOnlyInCurrentMonth) {
                this.selectDate(cell.dateObj);
            }
        }
        this.resetMonthYearSelect();
    }

    onCellKeyDown(event: any, cell: any) {
        // Cell keyboard handling
        if ((event.keyCode === KeyCode.enter || event.keyCode === KeyCode.space) && !cell.disabled) {
            event.preventDefault();
            this.onCellClicked(cell);
        }
    }

    selectDate(date: IMyDate): void {
        // Notifies parent using callback
        this.selectedDate = date;
        this.dateChanged(this.utilService.getDateModel(date, this.opts.dateFormat, this.opts.monthLabels), this.opts.closeSelectorOnDateSelect);
    }

    monthStartIdx(y: number, m: number): number {
        // Month start index
        let d = new Date();
        d.setDate(1);
        d.setMonth(m - 1);
        d.setFullYear(y);
        let idx = d.getDay() + this.sundayIdx();
        return idx >= 7 ? idx - 7 : idx;
    }

    daysInMonth(m: number, y: number): number {
        // Return number of days of current month
        return new Date(y, m, 0).getDate();
    }

    daysInPrevMonth(m: number, y: number): number {
        // Return number of days of the previous month
        let d: Date = this.getDate(y, m, 1);
        d.setMonth(d.getMonth() - 1);
        return this.daysInMonth(d.getMonth() + 1, d.getFullYear());
    }

    isCurrDay(d: number, m: number, y: number, cmo: number, today: IMyDate): boolean {
        // Check is a given date the today
        return d === today.day && m === today.month && y === today.year && cmo === this.currMonthId;
    }

    getToday(): IMyDate {
        let date: Date = new Date();
        return {year: date.getFullYear(), month: date.getMonth() + 1, day: date.getDate()};
    }

    getDayNumber(date: IMyDate): number {
        // Get day number: su=0, mo=1, tu=2, we=3 ...
        let d: Date = this.getDate(date.year, date.month, date.day);
        return d.getDay();
    }

    getWeekday(date: IMyDate): string {
        // Get weekday: su, mo, tu, we ...
        return this.weekDayOpts[this.getDayNumber(date)];
    }

    getDate(year: number, month: number, day: number): Date {
        // Creates a date object from given year, month and day
        return new Date(year, month - 1, day, 0, 0, 0, 0);
    }

    sundayIdx(): number {
        // Index of Sunday day
        return this.dayIdx > 0 ? 7 - this.dayIdx : 0;
    }

    generateCalendar(m: number, y: number, notifyChange: boolean): void {
        this.dates.length = 0;
        let today: IMyDate = this.getToday();
        let monthStart: number = this.monthStartIdx(y, m);
        let dInThisM: number = this.daysInMonth(m, y);
        let dInPrevM: number = this.daysInPrevMonth(m, y);

        let dayNbr: number = 1;
        let cmo: number = this.prevMonthId;
        for (let i = 1; i < 7; i++) {
            let week: Array<IMyCalendarDay> = [];
            if (i === 1) {
                // First week
                let pm = dInPrevM - monthStart + 1;
                // Previous month
                for (let j = pm; j <= dInPrevM; j++) {
                    let date: IMyDate = {year: m === 1 ? y - 1 : y, month: m === 1 ? 12 : m - 1, day: j};
                    week.push({dateObj: date,
                        cmo: cmo,
                        currDay: this.isCurrDay(j, m, y, cmo, today),
                        disabled: this.utilService.isDisabledDate(date, this.opts.minYear, this.opts.maxYear, this.opts.disableUntil, this.opts.disableSince, this.opts.disableWeekends, this.opts.disableDates, this.opts.disableDateRanges, this.opts.disableWeekdays, this.opts.enableDates),
                        markedDate: this.utilService.isMarkedDate(date, this.opts.markDates, this.opts.markWeekends),
                        highlight: this.utilService.isHighlightedDate(date, this.opts.sunHighlight, this.opts.satHighlight, this.opts.highlightDates)});
                }

                cmo = this.currMonthId;
                // Current month
                let daysLeft: number = 7 - week.length;
                for (let j = 0; j < daysLeft; j++) {
                    let date: IMyDate = {year: y, month: m, day: dayNbr};
                    week.push({dateObj: date,
                        cmo: cmo,
                        currDay: this.isCurrDay(dayNbr, m, y, cmo, today),
                        disabled: this.utilService.isDisabledDate(date, this.opts.minYear, this.opts.maxYear, this.opts.disableUntil, this.opts.disableSince, this.opts.disableWeekends, this.opts.disableDates, this.opts.disableDateRanges, this.opts.disableWeekdays, this.opts.enableDates),
                        markedDate: this.utilService.isMarkedDate(date, this.opts.markDates, this.opts.markWeekends),
                        highlight: this.utilService.isHighlightedDate(date, this.opts.sunHighlight, this.opts.satHighlight, this.opts.highlightDates)});
                    dayNbr++;
                }
            }
            else {
                // Rest of the weeks
                for (let j = 1; j < 8; j++) {
                    if (dayNbr > dInThisM) {
                        // Next month
                        dayNbr = 1;
                        cmo = this.nextMonthId;
                    }
                    let date: IMyDate = {year: cmo === this.nextMonthId && m === 12 ? y + 1 : y, month: cmo === this.currMonthId ? m : cmo === this.nextMonthId && m < 12 ? m + 1 : 1, day: dayNbr};
                    week.push({dateObj: date,
                        cmo: cmo,
                        currDay: this.isCurrDay(dayNbr, m, y, cmo, today),
                        disabled: this.utilService.isDisabledDate(date, this.opts.minYear, this.opts.maxYear, this.opts.disableUntil, this.opts.disableSince, this.opts.disableWeekends, this.opts.disableDates, this.opts.disableDateRanges, this.opts.disableWeekdays, this.opts.enableDates),
                        markedDate: this.utilService.isMarkedDate(date, this.opts.markDates, this.opts.markWeekends),
                        highlight: this.utilService.isHighlightedDate(date, this.opts.sunHighlight, this.opts.satHighlight, this.opts.highlightDates)});
                    dayNbr++;
                }
            }
            let weekNbr: number = this.opts.showWeekNumbers  && this.opts.firstDayOfWeek === "mo" ? this.utilService.getWeekNumber(week[0].dateObj) : 0;
            this.dates.push({week: week, weekNbr: weekNbr});
        }

        this.setHeaderBtnDisabledState(m, y);

        if (notifyChange) {
            // Notify parent
            this.calendarViewChanged({year: y, month: m, first: {number: 1, weekday: this.getWeekday({year: y, month: m, day: 1})}, last: {number: dInThisM, weekday: this.getWeekday({year: y, month: m, day: dInThisM})}});
        }
    }

    setHeaderBtnDisabledState(m: number, y: number): void {
        let dpm: boolean = false;
        let dpy: boolean = false;
        let dnm: boolean = false;
        let dny: boolean = false;
        if (this.opts.disableHeaderButtons) {
            dpm = this.utilService.isMonthDisabledByDisableUntil({year: m === 1 ? y - 1 : y, month: m === 1 ? 12 : m - 1, day: this.daysInMonth(m === 1 ? 12 : m - 1, m === 1 ? y - 1 : y)}, this.opts.disableUntil);
            dpy = this.utilService.isMonthDisabledByDisableUntil({year: y - 1, month: m, day: this.daysInMonth(m, y - 1)}, this.opts.disableUntil);
            dnm = this.utilService.isMonthDisabledByDisableSince({year: m === 12 ? y + 1 : y, month: m === 12 ? 1 : m + 1, day: 1}, this.opts.disableSince);
            dny = this.utilService.isMonthDisabledByDisableSince({year: y + 1, month: m, day: 1}, this.opts.disableSince);
        }
        this.prevMonthDisabled = m === 1 && y === this.opts.minYear || dpm;
        this.prevYearDisabled = y - 1 < this.opts.minYear || dpy;
        this.nextMonthDisabled = m === 12 && y === this.opts.maxYear || dnm;
        this.nextYearDisabled = y + 1 > this.opts.maxYear || dny;
    }
}
