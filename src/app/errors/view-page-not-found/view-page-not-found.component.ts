import {Component, OnInit} from '@angular/core';
import {BaseViewComponent} from '../../global/components/base-view/base-view.component';
import {ActivatedRoute, Router} from '@angular/router';
import {BookmarkService} from '../../global/services/bookmark.service';
import {TranslateService} from '@ngx-translate/core';
import {BookmarkIcon} from '../../shared/constants/bookmark-icon';

@Component({
  selector: 'cr-view-page-not-found',
  templateUrl: './view-page-not-found.component.html',
  styleUrls: ['./view-page-not-found.component.scss']
})
export class ViewPageNotFoundComponent extends BaseViewComponent implements OnInit {

  constructor(
    protected router: Router,
    protected route: ActivatedRoute,
    protected bookmarkService: BookmarkService,
    private translate: TranslateService,
  ) {
    super({
      nameTranslateKey: 'COMMON.BOOKMARK.ERROR_PAGE.NOT_FOUND.BOOKMARK_NAME',
      descriptionTranslateKey: 'COMMON.BOOKMARK.ERROR_PAGE.NOT_FOUND.BOOKMARK_DESCRIPTION',
      iconSvg: BookmarkIcon.dashboard,
      allowPinning: true,
    }, bookmarkService, router, route);
  }

  ngOnInit(): void {
  }

}
