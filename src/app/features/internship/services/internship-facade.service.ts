import {Injectable} from '@angular/core';
import {Observable, of, Subject} from 'rxjs';
import {BookmarkService} from '../../../global/services/bookmark/bookmark.service';
import {ConfigService} from '../../../global/services/config/config.service';
import {IPaginator} from '../../../shared/types/paginator';
import {map, tap} from 'rxjs/operators';
import {EducationApiService} from './education-api.service';
import {EducationMapperService} from './education-mapper.service';
import {cloneDeep, isNil} from 'lodash';
import {IInternshipListViewModel} from '../types/view-model/internship-list-view-model';
import {IInternshipViewModel} from '../types/view-model/internship-view-model';
import {IdSimpleItem} from '../../../shared/types/id-simple-item';
import {IPaginatorBase} from '../../../shared/types/paginator-base';
import {IInternshipFilterViewModel} from '../types/view-model/internship-filter-view-model';
import {IInternshipDetailsViewState} from '../types/view-model/internship-details-view-state';
import {IdNameSimpleItem} from '../../../shared/types/id-name-simple-item';

@Injectable({
  providedIn: 'root'
})
export class EducationFacadeService {
  public refreshDetails$: Subject<void> = new Subject<void>();

  constructor(
    private configService: ConfigService,
    private bookmarkService: BookmarkService,
    private educationMapperService: EducationMapperService,
    private educationApiService: EducationApiService,
  ) {
  }

  //region Education

  public getViewStateEducationListPaginator$(): Observable<IPaginatorBase> {
    if (isNil(this.bookmarkService.getCurrentViewState().educationListPaginator)) {
      this.bookmarkService.getCurrentViewState().educationListPaginator = {
        page: this.configService.getConfig().pagingGridBigPage,
        size: this.configService.getConfig().pagingGridBigSize,
        sort: [{field: 'id', dir: 'asc'}]
      };
    }

    return of(this.bookmarkService.getCurrentViewState().educationListPaginator);
  }

  public getViewStateEducationFilter$(): Observable<IInternshipFilterViewModel> {
    if (isNil(this.bookmarkService.getCurrentViewState().educationFilter)) {
      this.bookmarkService.getCurrentViewState().educationFilter = this.educationMapperService
        .educationInitializeFilterViewModel();
    }

    return of(this.bookmarkService.getCurrentViewState().educationFilter);
  }

  public getEducationList$(paginator: IPaginatorBase, filter: IInternshipFilterViewModel):
    Observable<IPaginator<IInternshipListViewModel>> {
    if (!!this.bookmarkService.getCurrentDataItem().educationList) {
      return of(this.bookmarkService.getCurrentDataItem().educationList);
    } else {
      return this.loadEducationList$(paginator, filter);
    }
  }

  public loadEducationList$(paginator: IPaginatorBase, filter: IInternshipFilterViewModel):
    Observable<IPaginator<IInternshipListViewModel>> {
    const filterModel = this.educationMapperService.educationFilterViewModelToModel(filter);
    return this.educationApiService.getEducationList$(paginator, filterModel).pipe(
      map(value => ({
        ...value.data,
        responseList: value.data.responseList.map(item => this.educationMapperService
          .educationListGetModelToViewModel(item)),
      })),
      tap(value => this.bookmarkService.getCurrentDataItem().educationList = value),
    );
  }

  public getEducation$(id: number): Observable<IInternshipViewModel> {
    if (!!this.bookmarkService.getCurrentDataItem().educationDetail) {
      return of(this.bookmarkService.getCurrentDataItem().educationDetail);
    } else {
      return this.loadEducation$(id);
    }
  }

  public loadEducation$(id: number): Observable<IInternshipViewModel> {
    return this.educationApiService.getEducation$(id)
      .pipe(
        map(value => this.educationMapperService.educationGetModelToViewModel(value.data)),
        tap(value => {
          this.bookmarkService.getCurrentDataItem().educationDetail = value;
          this.bookmarkService.getCurrentDataItem().educationDetailCopy = cloneDeep(value);
        })
      );
  }

  public createEducation$(education: IInternshipViewModel): Observable<IdSimpleItem> {
    const body = this.educationMapperService.educationViewModelToPostModel(education);
    return this.educationApiService.createEducation$(body)
      .pipe(map(value => value.data));
  }

  public updateEducation$(education: IInternshipViewModel):
    Observable<IInternshipViewModel> {
    const body = this.educationMapperService.educationViewModelToPutModel(education);
    return this.educationApiService.updateEducation$(body)
      .pipe(
        map(value => this.educationMapperService.educationGetModelToViewModel(value.data)),
        tap(value => {
          this.bookmarkService.getCurrentDataItem().educationDetail = value;
          this.bookmarkService.getCurrentDataItem().educationDetailCopy = cloneDeep(value);
        })
      );
  }

  public deleteEducation$(education: IInternshipViewModel): Observable<IdSimpleItem> {
    return this.educationApiService.deleteEducation$(
      education.id,
      education.guid
    ).pipe(map(resp => resp.data));
  }

  public getEducationDetailsViewState$(): Observable<IInternshipDetailsViewState> {
    if (isNil(this.bookmarkService.getCurrentViewState().educationDetails)) {
      this.bookmarkService.getCurrentViewState().educationDetails = this.educationMapperService
        .educationInitializeDetailsViewState();
    }

    return of(this.bookmarkService.getCurrentViewState().educationDetails);
  }

  // endregion

  // region Education dropdowns

  public getTeacherDropdownList$(paginator: IPaginatorBase): Observable<IPaginator<IdNameSimpleItem>> {
    return this.educationApiService.getTeacherDropdown$(paginator).pipe(map(resp => resp.data));
  }

  public getTeacherDropdownItem$(id: number): Observable<IdNameSimpleItem> {
    return this.educationApiService.getTeacherDropdownItem$(id).pipe(map(resp => resp.data));
  }

  public getEducationQualificationDropdownList$(paginator: IPaginatorBase): Observable<IPaginator<IdNameSimpleItem>> {
    return this.educationApiService.getEducationQualificationDropdown$(paginator).pipe(map(resp => resp.data));
  }

  public getEducationQualificationDropdownItem$(id: number): Observable<IdNameSimpleItem> {
    return this.educationApiService.getEducationQualificationDropdownItem$(id).pipe(map(resp => resp.data));
  }

  // endregion
}
