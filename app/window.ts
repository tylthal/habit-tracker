// apparently this is required to eliminate a Typescript compile issue in app.component.ts when calling the Google idenity provider setup method
interface Window {
  google: any;
}
