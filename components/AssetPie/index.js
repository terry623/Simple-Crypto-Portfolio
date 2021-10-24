import React from "react";
import { Pie, measureTextWidth } from "@ant-design/charts";
import { calculateForAssetPie } from "utils";

function renderStatistic(containerWidth, text, style) {
  const _measureTextWidth = (0, measureTextWidth)(text, style);
  const textWidth = _measureTextWidth.width;
  const textHeight = _measureTextWidth.height;

  const R = containerWidth / 2;
  let scale = 1;
  if (containerWidth < textWidth) {
    scale = Math.min(
      Math.sqrt(
        Math.abs(
          Math.pow(R, 2) /
            (Math.pow(textWidth / 2, 2) + Math.pow(textHeight, 2))
        )
      ),
      1
    );
  }

  const textStyleStr = "width:".concat(containerWidth, "px;");
  return '<div style="'
    .concat(textStyleStr, ";font-size:")
    .concat(scale, "em;line-height:")
    .concat(scale < 1 ? 1 : "inherit", ';">')
    .concat(text, "</div>");
}

const AssetPie = ({ data }) => {
  data = calculateForAssetPie(data);

  const config = {
    appendPadding: 10,
    data: data,
    angleField: "value",
    colorField: "type",
    radius: 1,
    innerRadius: 0.64,
    legend: false,
    label: {
      type: "inner",
      offset: "-50%",
      style: { textAlign: "center" },
      autoRotate: false,
      content: "{name}\n{percentage}",
    },
    statistic: {
      title: {
        offsetY: -8,
        customHtml: function customHtml(container, view, datum) {
          const _container$getBoundin = container.getBoundingClientRect();
          const width = _container$getBoundin.width;
          const height = _container$getBoundin.height;
          const d = Math.sqrt(Math.pow(width / 2, 2) + Math.pow(height / 2, 2));
          const text = datum ? datum.type : "Total Value";
          return renderStatistic(d, text, { fontSize: 28 });
        },
      },
      content: {
        offsetY: 4,
        style: { fontSize: "32px" },
        customHtml: function customHtml(container, view, datum, data) {
          const _container$getBoundin2 = container.getBoundingClientRect();
          const width = _container$getBoundin2.width;
          const text = datum
            ? "$".concat(datum.value)
            : "$".concat(
                data
                  .reduce(function (r, d) {
                    return r + d.value;
                  }, 0)
                  .toFixed(2)
              );
          return renderStatistic(width, text, { fontSize: 32 });
        },
      },
    },
    interactions: [
      {
        type: "pie-statistic-active",
        cfg: {
          start: [
            { trigger: "element:mouseenter", action: "pie-statistic:change" },
            {
              trigger: "legend-item:mouseenter",
              action: "pie-statistic:change",
            },
            { trigger: "element:mouseleave", action: "pie-statistic:reset" },
            {
              trigger: "legend-item:mouseleave",
              action: "pie-statistic:reset",
            },
          ],
        },
      },
    ],
  };
  return <Pie {...config} />;
};

export default AssetPie;
