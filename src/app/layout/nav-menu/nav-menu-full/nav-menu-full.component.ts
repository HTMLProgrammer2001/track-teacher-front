import {Component, Input, OnInit} from '@angular/core';
import {NavMenuFullItem} from '../types/nav-menu-full-item';
import {Router} from '@angular/router';
import {BookmarkService} from '../../../global/services/bookmark.service';
import {isEmpty, isNil} from 'lodash';
import {PanelBarItemModel} from '@progress/kendo-angular-layout/dist/es2015/panelbar/panelbar-item-model';

@Component({
  selector: 'cr-nav-menu-full',
  templateUrl: './nav-menu-full.component.html',
  styleUrls: ['./nav-menu-full.component.scss'],
})
export class NavMenuFullComponent implements OnInit {
  @Input() menuItems: Array<NavMenuFullItem>;
  @Input() level: number;

  constructor(private route: Router,
              private bookmarkService: BookmarkService) {
  }

  ngOnInit(): void {

  }

  onStateChange(changedItems: Array<PanelBarItemModel>) {

    if (!isNil(changedItems) && !isEmpty(changedItems)) {
      changedItems.forEach(changedItem => {
        // eslint-disable-next-line @typescript-eslint/prefer-for-of
        for (let i = 0; i < this.menuItems.length; i++) {
          if (this.menuItems[i].id === changedItem.id) {
            this.menuItems[i].expanded = changedItem.expanded;
            break;
          }
        }
      });
    }
  }

  navigateByRoute(menuItem: NavMenuFullItem) {
    if (!isNil(menuItem) && !isNil(menuItem.task) && !isNil(menuItem.task.route)){
      const emptyRoutePath = 'empty';
      this.route.navigateByUrl(emptyRoutePath, {skipLocationChange: true}).then(() => {
        this.route.navigate([menuItem.task.route]).then();
      });
    }
  }

  chooseBookmark(bookmarkId: string) {
    this.bookmarkService.setCurrentBookmarkById(bookmarkId).subscribe(value => {
      this.route.navigateByUrl('/', {skipLocationChange: true}).then(() =>
        this.route.navigate([value.route]).then());
    });

  }

}
