export interface NavMenuSmallItem {
  iconSvg?: string;
  icon?: string;
  title?: string;
  titleTranslateKeys?: string;
  route?: string;
  isMainLevel?: boolean;
  levelClass?: 'main-menu' | 'sub-main-menu' | 'sub-menu';
  itemType?: 'menu' | 'link' | 'header' | 'section';
  items?: Array<NavMenuSmallItem>;
  isAccessGranted?: () => boolean;
}
