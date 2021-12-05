use neon::prelude::*;

fn hello(mut cx: FunctionContext) -> JsResult<JsString> {
    Ok(cx.string("hello node"))
}

fn triangle_single(mut cx: FunctionContext) -> JsResult<JsNumber> {
    let ceil = cx.argument::<JsNumber>(0)?.value();

    let sum: u128 = (0..ceil as u128).sum::<u128>();
    Ok(cx.number(sum as f64))
}

register_module!(mut cx, {
    cx.export_function("hello", hello)?;
    cx.export_function("triangle_single", triangle_single)?;
    Ok(())
});