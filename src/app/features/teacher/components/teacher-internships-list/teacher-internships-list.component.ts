import {Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges} from '@angular/core';
import {IPaginatorBase} from '../../../../shared/types/paginator-base';
import {forkJoin, ReplaySubject} from 'rxjs';
import {IEditGridColumnSetting} from '../../../../shared/types/edit-grid/edit-grid-column-settings';
import {readRoles} from '../../../../shared/roles';
import {Router} from '@angular/router';
import {ErrorService} from '../../../../global/services/error.service';
import {CustomNotificationService} from '../../../../global/services/custom-notification.service';
import {AuthService} from '../../../../global/services/auth/auth.service';
import {switchMap, takeUntil} from 'rxjs/operators';
import {isEmpty} from 'lodash';
import {TeacherFacadeService} from '../../services/teacher-facade.service';
import {ITeacherViewModel} from '../../types/view-model/teacher-view-model';
import {ITeacherAttestationListViewModel} from '../../types/view-model/teacher-attestation-list-view-model';
import {ITeacherInternshipListResponseViewModel} from '../../types/view-model/teacher-internship-list-response-view-model';

@Component({
  selector: 'cr-teacher-internships-list',
  templateUrl: './teacher-internships-list.component.html',
})
export class TeacherInternshipsListComponent implements OnInit, OnDestroy, OnChanges {
  @Input() teacher: ITeacherViewModel;

  public dataSource: ITeacherInternshipListResponseViewModel;
  public paginator: IPaginatorBase;
  private onDestroy = new ReplaySubject(1);

  public columnSettings: Array<IEditGridColumnSetting> = [
    {
      field: 'id',
      titleTranslateKey: 'TEACHER.DETAILS.INTERNSHIPS_LIST.GRID.ID',
      type: 'link',
      disabledIf: () => !readRoles.includes(this.authService.currentRole)
    },
    {
      field: 'title',
      titleTranslateKey: 'TEACHER.DETAILS.INTERNSHIPS_LIST.GRID.TITLE',
      type: 'text'
    },
    {
      field: 'place',
      titleTranslateKey: 'TEACHER.DETAILS.INTERNSHIPS_LIST.GRID.PLACE',
      type: 'text'
    },
    {
      field: 'hours',
      titleTranslateKey: 'TEACHER.DETAILS.INTERNSHIPS_LIST.GRID.HOURS',
      type: 'numeric'
    },
    {
      field: 'credits',
      titleTranslateKey: 'TEACHER.DETAILS.INTERNSHIPS_LIST.GRID.CREDITS',
      type: 'numeric'
    },
    {
      field: 'from',
      titleTranslateKey: 'TEACHER.DETAILS.INTERNSHIPS_LIST.GRID.FROM',
      type: 'date'
    },
    {
      field: 'to',
      titleTranslateKey: 'TEACHER.DETAILS.INTERNSHIPS_LIST.GRID.TO',
      type: 'date'
    },
  ];

  constructor(
    protected router: Router,
    private teacherFacadeService: TeacherFacadeService,
    private errorService: ErrorService,
    private customNotificationService: CustomNotificationService,
    public authService: AuthService,
  ) {
  }

  // region Component lifecycle
  ngOnInit(): void {
    this.getDataList();

    this.teacherFacadeService.refreshDetails$
      .pipe(takeUntil(this.onDestroy))
      .subscribe(() => this.loadDataList());
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.teacher && !changes.teacher.firstChange
      && changes.teacher.previousValue.id !== changes.teacher.currentValue.id) {
      this.loadDataList();
    }
  }

  ngOnDestroy(): void {
    this.onDestroy.next();
    this.onDestroy.complete();
  }

  // endregion

  // region Get and create data
  getDataList(): void {
    forkJoin({paginator: this.teacherFacadeService.getViewStateTeacherInternshipListPaginator$()}).pipe(
      takeUntil(this.onDestroy),
      switchMap(values => {
        this.paginator = values.paginator;
        return this.teacherFacadeService.getTeacherInternshipList$(this.paginator, this.teacher);
      })
    ).subscribe(dataSource => {
      this.dataSource = dataSource;
      this.paginator.page = dataSource.page;
      this.paginator.size = dataSource.size;
    }, error => {
      const errors = this.errorService.getMessagesToShow(error.errors);

      if (!isEmpty(errors)) {
        const errorDialog = this.customNotificationService.showDialogError(errors);
        errorDialog.result.subscribe(() => this.errorService.redirectIfUnauthorized(error.errors));
      }
    });
  }

  loadDataList() {
    this.teacherFacadeService.loadTeacherInternshipList$(this.paginator, this.teacher)
      .pipe(takeUntil(this.onDestroy))
      .subscribe(value => {
        this.dataSource = value;
        this.paginator.page = value.page;
        this.paginator.size = value.size;
      }, error => {
        const errors = this.errorService.getMessagesToShow(error.errors);

        if (!isEmpty(errors)) {
          const errorDialog = this.customNotificationService.showDialogError(errors);
          errorDialog.result.subscribe(() => this.errorService.redirectIfUnauthorized(error.errors));
        }
      });
  }

  // endregion

  //region Work with grid

  cellClick(event: ITeacherAttestationListViewModel): Promise<boolean> {
    const route = `internship/details/${event.id}`;
    return this.router.navigate([route]);
  }

  changePage(paginator: IPaginatorBase): void {
    this.paginator.page = paginator.page;
    this.paginator.size = paginator.size;
    this.paginator.sort = paginator.sort;

    this.loadDataList();
  }

  //endregion
}
