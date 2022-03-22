export interface IEducationFilterModel {
  educationQualificationId: number;
  institution: string;
  specialty: string;
  teacherId: number;
  yearOfIssueLess: number;
  yearOfIssueMore: number;
  showDeleted: boolean;
}
