import React, {PureComponent} from 'react';
import './App.css';
import SingleAxisEqualDynamicCellModel from "./hypercharts/core/model/cell/SingleAxisEqualDynamicCellModel";
import SingleAxisRenderModel from "./hypercharts/core/model/render/SingleAxisRenderModel";
import {PanListener, ZoomListener} from "./hypercharts/core/listener";

class App extends PureComponent {
  componentDidMount() {
    const data = [
      100, 120, 80, 100, 110, 50, 23, 234, 150, 200,
      100, 120, 80, 100, 110, 50, 23, 234, 150, 200,
      100, 120, 80, 100, 110, 50, 23, 234, 150, 200,
      100, 120, 80, 100, 110, 50, 23, 234, 150, 200,
      100, 120, 80, 100, 110, 50, 23, 234, 150, 200
    ]; // data series

    const cnvs = document.getElementById("renderer-cnvs");
    cnvs.width = cnvs.offsetWidth;
    cnvs.height = cnvs.offsetHeight;
    const ctx = cnvs.getContext("2d");
    const renderModel = new SingleAxisRenderModel(ctx);
    const cellModel = new SingleAxisEqualDynamicCellModel(
        renderModel, 200, 20, 0, 1, 0, data, cnvs.width, cnvs.height);
    cellModel.transform(0, 1, 0);
    //
    const panListener = new PanListener(cnvs, {}, delta => {
      ctx.clearRect(0, 0, cnvs.width, cnvs.height);
      cellModel.transform(-delta.x, 1, 0);
    });
    const zoomListener = new ZoomListener(cnvs, {}, (delta, px) => {
      ctx.clearRect(0, 0, cnvs.width, cnvs.height);
      cellModel.transform(0, delta, px);
    })

  }

  render() {
    return (
        <div className="App">
          <div className="wrapper">
            <section id="renderer-section">
              <canvas id="renderer-cnvs"/>
            </section>
          </div>
        </div>
    );
  }
}

export default App;
