/* eslint-disable max-len */
import {IPaginator} from '../../../shared/types/paginator';
import {ICommissionListViewModel} from '../../../features/commission/types/view-model/commission-list-view-model';
import {ICommissionViewModel} from '../../../features/commission/types/view-model/commission-view-model';
import {IdNameSimpleItem} from '../../../shared/types/id-name-simple-item';
import {IUserInfoProfileGetModel} from '../../components/user-info/types/user-info-profile-get-model';
import {IDepartmentListViewModel} from '../../../features/department/types/view-model/department-list-view-model';
import {IDepartmentViewModel} from '../../../features/department/types/view-model/department-view-model';
import {IAcademicDegreeListViewModel} from '../../../features/academic-degree/types/view-model/academic-degree-list-view-model';
import {IAcademicDegreeViewModel} from '../../../features/academic-degree/types/view-model/academic-degree-view-model';
import {IAcademicTitleViewModel} from '../../../features/academic-title/types/view-model/academic-title-view-model';
import {IAcademicTitleListViewModel} from '../../../features/academic-title/types/view-model/academic-title-list-view-model';
import {ITeachingRankListViewModel} from '../../../features/teaching-rank/types/view-model/teaching-rank-list-view-model';
import {ITeachingRankViewModel} from '../../../features/teaching-rank/types/view-model/teaching-rank-view-model';
import {ITeacherListViewModel} from '../../../features/teacher/types/view-model/teacher-list-view-model';
import {ITeacherViewModel} from '../../../features/teacher/types/view-model/teacher-view-model';
import {ITeacherPublicationListViewModel} from '../../../features/teacher/types/view-model/teacher-publication-list-view-model';
import {ITeacherHonorListViewModel} from '../../../features/teacher/types/view-model/teacher-honor-list-view-model';
import {ITeacherRebukeListViewModel} from '../../../features/teacher/types/view-model/teacher-rebuke-list-view-model';
import {ITeacherEducationListViewModel} from '../../../features/teacher/types/view-model/teacher-education-list-view-model';
import {ITeacherInternshipListResponseViewModel} from '../../../features/teacher/types/view-model/teacher-internship-list-response-view-model';
import {ITeacherAttestationListResponseViewModel} from '../../../features/teacher/types/view-model/teacher-attestation-list-response-view-model';
import {IEducationQualificationListViewModel} from '../../../features/education-qualification/types/view-model/education-qualification-list-view-model';
import {IEducationQualificationViewModel} from '../../../features/education-qualification/types/view-model/education-qualification-view-model';
import {IEducationQualificationEducationViewModel} from '../../../features/education-qualification/types/view-model/education-qualification-education-view-model';
import {IEducationListViewModel} from '../../../features/education/types/view-model/education-list-view-model';
import {IEducationViewModel} from '../../../features/education/types/view-model/education-view-model';
import {ICategoryListViewModel} from '../../../features/category/types/view-model/category-list-view-model';
import {ICategoryViewModel} from '../../../features/category/types/view-model/category-view-model';
import {ICategoryAttestationViewModel} from '../../../features/category/types/view-model/category-attestation-view-model';
import {IInternshipListViewModel} from '../../../features/internship/types/view-model/internship-list-view-model';
import {IInternshipViewModel} from '../../../features/internship/types/view-model/internship-view-model';
import {IAttestationListViewModel} from '../../../features/attestation/types/view-model/attestation-list-view-model';
import {IAttestationViewModel} from '../../../features/attestation/types/view-model/attestation-view-model';
import {IPublicationListViewModel} from '../../../features/publication/types/view-model/publication-list-view-model';
import {IPublicationViewModel} from '../../../features/publication/types/view-model/publication-view-model';
import {IHonorListViewModel} from '../../../features/honor/types/view-model/honor-list-view-model';
import {IHonorViewModel} from '../../../features/honor/types/view-model/honor-view-model';
import {IRebukeListViewModel} from '../../../features/rebuke/types/view-model/rebuke-list-view-model';
import {IRebukeViewModel} from '../../../features/rebuke/types/view-model/rebuke-view-model';
import {IUserListViewModel} from '../../../features/user/types/view-model/user-list-view-model';
import {IUserViewModel} from '../../../features/user/types/view-model/user-view-model';
import {IProfileViewModel} from '../../../features/profile/types/view-model/profile-view-model';
import {IGenerateReportFilterViewModel} from '../../../features/export/types/view-model/generate-report-filter-view-model';
import {IImportBodyViewModel} from '../../../features/import/types/view-model/import-body-view-model';
import {IImportErrorViewModel} from '../../../features/import/types/view-model/import-error-view-model';
import {INotificationConfigViewModel} from '../../../features/notification/types/view-model/notification-config-view-model';
import {INotificationTeacherViewModel} from '../../../features/notification/types/view-model/notification-teacher-view-model';

export interface IBookmarkData {
  /** User info **/
  userInfo?: IUserInfoProfileGetModel;

  /** Commission **/
  commissionList?: IPaginator<ICommissionListViewModel>;
  commissionDetail?: ICommissionViewModel;
  commissionDetailCopy?: ICommissionViewModel;
  commissionTeachersList?: IPaginator<IdNameSimpleItem>;

  /** Department **/
  departmentList?: IPaginator<IDepartmentListViewModel>;
  departmentDetail?: IDepartmentViewModel;
  departmentDetailCopy?: IDepartmentViewModel;
  departmentTeachersList?: IPaginator<IdNameSimpleItem>;

  /** Academic degree **/
  academicDegreeList?: IPaginator<IAcademicDegreeListViewModel>;
  academicDegreeDetail?: IAcademicDegreeViewModel;
  academicDegreeDetailCopy?: IAcademicDegreeViewModel;
  academicDegreeTeachersList?: IPaginator<IdNameSimpleItem>;

  /** Academic degree **/
  academicTitleList?: IPaginator<IAcademicTitleListViewModel>;
  academicTitleDetail?: IAcademicTitleViewModel;
  academicTitleDetailCopy?: IAcademicTitleViewModel;
  academicTitleTeachersList?: IPaginator<IdNameSimpleItem>;

  /** Teaching rank **/
  teachingRankList?: IPaginator<ITeachingRankListViewModel>;
  teachingRankDetail?: ITeachingRankViewModel;
  teachingRankDetailCopy?: ITeachingRankViewModel;
  teachingRankTeachersList?: IPaginator<IdNameSimpleItem>;

  /** Teacher **/
  teacherList?: IPaginator<ITeacherListViewModel>;
  teacherDetail?: ITeacherViewModel;
  teacherDetailCopy?: ITeacherViewModel;
  teacherAttestationList?: ITeacherAttestationListResponseViewModel;
  teacherInternshipList?: ITeacherInternshipListResponseViewModel;
  teacherPublicationList?: IPaginator<ITeacherPublicationListViewModel>;
  teacherHonorList?: IPaginator<ITeacherHonorListViewModel>;
  teacherRebukeList?: IPaginator<ITeacherRebukeListViewModel>;
  teacherEducationList?: IPaginator<ITeacherEducationListViewModel>;

  /** Education qualification **/
  educationQualificationList?: IPaginator<IEducationQualificationListViewModel>;
  educationQualificationDetail?: IEducationQualificationViewModel;
  educationQualificationDetailCopy?: IEducationQualificationViewModel;
  educationQualificationEducationsList?: IPaginator<IEducationQualificationEducationViewModel>;

  /** Education **/
  educationList?: IPaginator<IEducationListViewModel>;
  educationDetail?: IEducationViewModel;
  educationDetailCopy?: IEducationViewModel;

  /** Category **/
  categoryList?: IPaginator<ICategoryListViewModel>;
  categoryDetail?: ICategoryViewModel;
  categoryDetailCopy?: ICategoryViewModel;
  categoryAttestationsList?: IPaginator<ICategoryAttestationViewModel>;

  /** Internship **/
  internshipList?: IPaginator<IInternshipListViewModel>;
  internshipDetail?: IInternshipViewModel;
  internshipDetailCopy?: IInternshipViewModel;

  /** Attestation **/
  attestationList?: IPaginator<IAttestationListViewModel>;
  attestationDetail?: IAttestationViewModel;
  attestationDetailCopy?: IAttestationViewModel;

  /** Publication **/
  publicationList?: IPaginator<IPublicationListViewModel>;
  publicationDetail?: IPublicationViewModel;
  publicationDetailCopy?: IPublicationViewModel;

  /** Honor **/
  honorList?: IPaginator<IHonorListViewModel>;
  honorDetail?: IHonorViewModel;
  honorDetailCopy?: IHonorViewModel;

  /** Rebuke **/
  rebukeList?: IPaginator<IRebukeListViewModel>;
  rebukeDetail?: IRebukeViewModel;
  rebukeDetailCopy?: IRebukeViewModel;

  /** User **/
  userList?: IPaginator<IUserListViewModel>;
  userDetail?: IUserViewModel;
  userDetailCopy?: IUserViewModel;

  /** Profile **/
  profileDetail?: IProfileViewModel;
  profileDetailCopy?: IProfileViewModel;

  /** Export **/
  exportFilter?: IGenerateReportFilterViewModel;

  /** Import **/
  importBody?: IImportBodyViewModel;
  importErrors?: Array<IImportErrorViewModel>;

  /** Notification **/
  notificationConfig?: INotificationConfigViewModel;
  notificationConfigCopy?: INotificationConfigViewModel;
  teachersToNotify?: Array<INotificationTeacherViewModel>;
}
