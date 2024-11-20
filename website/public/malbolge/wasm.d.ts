/* tslint:disable */
/* eslint-disable */
export enum JsExecState {
  Input = 0,
  Output = 1,
  Finished = 2,
  InstructionExectuted = 3,
}
export class MalbolgeVM {
  free(): void;
  /**
   * @param {string} program
   */
  constructor(program: string);
  /**
   * @returns {MyTuple}
   */
  exec(): MyTuple;
  /**
   * @param {number} input
   * @param {number} size
   */
  input_js(input: number, size: number): void;
}
export class MyTuple {
  free(): void;
  0: JsExecState;
  1: bigint;
}

export type InitInput = RequestInfo | URL | Response | BufferSource | WebAssembly.Module;

export interface InitOutput {
  readonly memory: WebAssembly.Memory;
  readonly __wbg_malbolgevm_free: (a: number, b: number) => void;
  readonly __wbg_mytuple_free: (a: number, b: number) => void;
  readonly __wbg_get_mytuple_0: (a: number) => number;
  readonly __wbg_set_mytuple_0: (a: number, b: number) => void;
  readonly __wbg_get_mytuple_1: (a: number) => number;
  readonly __wbg_set_mytuple_1: (a: number, b: number) => void;
  readonly malbolgevm_new: (a: number, b: number) => number;
  readonly malbolgevm_exec: (a: number) => number;
  readonly malbolgevm_input_js: (a: number, b: number, c: number) => void;
  readonly __wbindgen_export_0: WebAssembly.Table;
  readonly __wbindgen_malloc: (a: number, b: number) => number;
  readonly __wbindgen_realloc: (a: number, b: number, c: number, d: number) => number;
  readonly __wbindgen_start: () => void;
}

export type SyncInitInput = BufferSource | WebAssembly.Module;
/**
* Instantiates the given `module`, which can either be bytes or
* a precompiled `WebAssembly.Module`.
*
* @param {{ module: SyncInitInput }} module - Passing `SyncInitInput` directly is deprecated.
*
* @returns {InitOutput}
*/
export function initSync(module: { module: SyncInitInput } | SyncInitInput): InitOutput;

/**
* If `module_or_path` is {RequestInfo} or {URL}, makes a request and
* for everything else, calls `WebAssembly.instantiate` directly.
*
* @param {{ module_or_path: InitInput | Promise<InitInput> }} module_or_path - Passing `InitInput` directly is deprecated.
*
* @returns {Promise<InitOutput>}
*/
export default function __wbg_init (module_or_path?: { module_or_path: InitInput | Promise<InitInput> } | InitInput | Promise<InitInput>): Promise<InitOutput>;
