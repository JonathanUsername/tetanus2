use neon::prelude::*;
use rayon::prelude::*;

fn hello(mut cx: FunctionContext) -> JsResult<JsString> {
    Ok(cx.string("hello node"))
}

fn triangle_single(mut cx: FunctionContext) -> JsResult<JsNumber> {
    let ceil = cx.argument::<JsNumber>(0)?.value();

    let sum: u64 = (0..ceil as u64).sum();
    Ok(cx.number(sum as f64))
}

fn triangle_parallel(mut cx: FunctionContext) -> JsResult<JsNumber> {
    let ceil = cx.argument::<JsNumber>(0)?.value();

    let sum: u64 = (0..ceil as u64).into_par_iter().sum();
    Ok(cx.number(sum as f64))
}

register_module!(mut cx, {
    cx.export_function("hello", hello)?;
    cx.export_function("rust_triangle_single", triangle_single)?;
    cx.export_function("rust_triangle_parallel", triangle_parallel)?;
    Ok(())
});