import {Component, HostListener, OnInit, ViewChild} from '@angular/core';
import {Validator} from '../../../../shared/types/validation/validator';
import {ValidationTypes} from '../../../../shared/types/validation/validation-types';
import {User} from '../../../types/auth/user';
import {TranslateService} from '@ngx-translate/core';
import {CustomNotificationService} from '../../../services/custom-notification.service';
import {AuthService} from '../../../services/auth/auth.service';
import {Status} from '../../../../shared/constants/status';
import {Router} from '@angular/router';
import {BookmarkService} from '../../../services/bookmark.service';
import {DialogRef} from '@progress/kendo-angular-dialog/dist/es2015/dialog/dialog-settings';
import {ConfigService} from '../../../services/config.service';
import {ButtonControlComponent} from '../../../../shared/components/button-control/button-control.component';
import {NetworkStatusService} from '../../../services/network-status.service';
import {ErrorService} from '../../../services/error.service';
import {LanguageService} from '../../../services/language.service';
import {ILanguageViewModel} from '../../../types/language/language';
import {Title} from '@angular/platform-browser';

@Component({
  selector: 'cr-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  @ViewChild('loginButton') loginButton: ButtonControlComponent;
  public loginValidator: Validator;
  public user: User = null;
  public tagVersion: string;
  public appVersion: string;
  private isPopupOpen: boolean;
  public languages: Array<ILanguageViewModel> = [];
  public companySearchFilter = '';

  constructor(
    private title: Title,
    public authService: AuthService,
    private translate: TranslateService,
    private router: Router,
    public bookmarksService: BookmarkService,
    private customNotificationService: CustomNotificationService,
    private configService: ConfigService,
    public networkStatusService: NetworkStatusService,
    private errorService: ErrorService,
    private languageService: LanguageService,
  ) {
    this.tagVersion = configService.getVersion().currentVersion;
    this.appVersion = configService.getVersion().appVersion;

    this.initValidator();
    this.user = new User();
    authService.cleanAuthState();
  }

  @HostListener('document:keypress', ['$event'])
  keyEvent(event: KeyboardEvent) {
    if (['Enter', 'NumpadEnter'].includes(event.code)) {
      event.preventDefault();

      if (!this.isPopupOpen) {
        this.login();
      }
    }
  }

  ngOnInit(): void {
    this.authService.stopLogoffTimer();

    this.languageService.getLanguages$().subscribe(
      languages => this.languages = languages,
      error => this.customNotificationService.showDialogError(this.errorService.getMessagesToShow(error.errors))
    );

    this.title.setTitle(this.authService.currentCompanyName ?? 'Track teacher');
  }

  initValidator(): void {
    this.loginValidator = new Validator(
      {
        type: ValidationTypes.required,
        fieldName: 'login',
        message: 'Username is required'
      },
      {
        type: ValidationTypes.required,
        fieldName: 'password',
        message: 'Password is required'
      }
    );
  }

  login(): void {
    this.loginValidator.validateDto(this.user);
    if (this.loginValidator.dtoValidationResult.isValid) {
      this.authService.login(this.user).subscribe(value => {
        if (value.status === Status.ok) {

          this.user.firstName = value.data.firstName;
          this.user.lastName = value.data.lastName;
          this.authService.updateToken(value.data, this.user);
          this.authService.user = this.user;
          this.authService.startTimerAfterLogin();

          this.languageService.getLanguages$().subscribe(languages => {
            this.router.navigate(['/'])
              .then(() => {
                if (languages.some(lang => lang.code === this.languageService.getCurrentLanguageCode())) {
                  this.translate.use(this.languageService.getCurrentLanguageCode());
                } else {
                  const defaultLang = languages.find(lang => lang.isDefault);
                  this.languageService.setCurrentLanguage(defaultLang);
                  this.translate.use(defaultLang.code);
                }
              });
          });
        }
      }, error => {
        const dialogRef = this.customNotificationService.showDialogError(this.errorService.getMessagesToShow(error.errors));
        this.processDialog(dialogRef);
      });
    } else {
      const dialogRef = this.customNotificationService.showDialogValidation(this.loginValidator);
      this.processDialog(dialogRef);
    }
  }

  private processDialog(dialogRef: DialogRef) {
    this.isPopupOpen = true;
    dialogRef.result.subscribe(() => this.isPopupOpen = false);
  }
}
