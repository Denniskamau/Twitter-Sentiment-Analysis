/* SystemJS module definition */
declare var module: NodeModule;
interface NodeModule {
  id: string;
}
interface JQueryStatic {
  notify(options: any, settings: any);
}

declare let Chartist: any;

