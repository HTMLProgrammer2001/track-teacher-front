export enum ValidationTypes {
  required = 'required',
  email = 'email',
  minLength = 'minLength',
  maxLength = 'maxLength',
  minValue = 'minValue',
  maxValue = 'maxValue',
  minDate = 'minDate',
  maxDate = 'maxDate',
  dateGreaterThan = 'dateGreaterThan',
  dateTimeGreaterThan = 'dateTimeGreaterThan',
  dateLessThan = 'dateLessThan',
  dateTimeLessThan = 'dateTimeLessThan',
  pattern = 'pattern',
  passport = 'passport',
  customValidationWithFunction = 'customValidationWithFunction',
  numberGreaterThan = 'numberGreaterThan',
  numberLessThan = 'numberLessThan',
}