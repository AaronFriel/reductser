export interface SimpleAction<T = any, R = any> {
  type: T;
  reducer: R;
}

export interface PayloadAction<T = any, R = any, P = any> extends SimpleAction<T, R> {
  payload: P;
}

export interface HandlerAction<T = any, R = any, S = any> extends SimpleAction<T, R> {
  handler: (state: S) => S;
}
