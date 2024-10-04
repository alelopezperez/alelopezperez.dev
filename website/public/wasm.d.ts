/* tslint:disable */
/* eslint-disable */
/**
* @param {bigint} left
* @param {bigint} right
* @returns {bigint}
*/
export function add(left: bigint, right: bigint): bigint;
/**
*/
export class Emulator {
  free(): void;
/**
*/
  constructor();
/**
* @param {Uint8Array} data
*/
  load(data: Uint8Array): void;
/**
*/
  exec(): void;
/**
* @returns {boolean}
*/
  can_draw(): boolean;
/**
*/
  un_draw(): void;
/**
* @returns {number}
*/
  get_delay_timer(): number;
/**
*/
  tick_delay_timer(): void;
/**
* @param {KeyboardEvent} evt
* @param {boolean} state
*/
  keypress(evt: KeyboardEvent, state: boolean): void;
/**
* @returns {Uint32Array}
*/
  get_buffer(): Uint32Array;
}

export type InitInput = RequestInfo | URL | Response | BufferSource | WebAssembly.Module;

export interface InitOutput {
  readonly memory: WebAssembly.Memory;
  readonly __wbg_emulator_free: (a: number, b: number) => void;
  readonly add: (a: number, b: number) => number;
  readonly emulator_new: () => number;
  readonly emulator_load: (a: number, b: number) => void;
  readonly emulator_exec: (a: number) => void;
  readonly emulator_can_draw: (a: number) => number;
  readonly emulator_un_draw: (a: number) => void;
  readonly emulator_get_delay_timer: (a: number) => number;
  readonly emulator_tick_delay_timer: (a: number) => void;
  readonly emulator_keypress: (a: number, b: number, c: number) => void;
  readonly emulator_get_buffer: (a: number, b: number) => void;
  readonly __wbindgen_add_to_stack_pointer: (a: number) => number;
  readonly __wbindgen_free: (a: number, b: number, c: number) => void;
  readonly __wbindgen_malloc: (a: number, b: number) => number;
  readonly __wbindgen_realloc: (a: number, b: number, c: number, d: number) => number;
  readonly __wbindgen_exn_store: (a: number) => void;
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
