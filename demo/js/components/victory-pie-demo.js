/*global window:false*/
/*eslint-disable no-magic-numbers,react/no-multi-comp*/
import { random, range } from "lodash";
import React from "react";
import { VictoryPie } from "victory-pie";
import { VictoryTooltip } from "victory-tooltip";
import { VictoryTheme } from "victory-core";

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: this.getData(),
      transitionData: this.getTransitionData(),
      colorScale: [
        "#D85F49",
        "#F66D3B",
        "#D92E1D",
        "#D73C4C",
        "#FFAF59",
        "#E28300",
        "#F6A57F",
      ],
      sliceWidth: 60,
      style: {
        parent: {
          backgroundColor: "#f7f7f7",
          border: "1px solid #ccc",
          margin: "2%",
          maxWidth: "40%",
        },
      },
    };
  }

  componentDidMount() {
    /* eslint-disable react/no-did-mount-set-state */
    this.setStateInterval = window.setInterval(() => {
      this.setState({
        data: this.getData(),
        transitionData: this.getTransitionData(),
      });
    }, 4000);
  }

  componentWillUnmount() {
    window.clearInterval(this.setStateInterval);
  }

  getTransitionData() {
    const data = random(6, 9);
    return range(data).map((datum) => {
      return {
        x: datum,
        y: random(2, 9),
        label: `#${datum}`,
      };
    });
  }

  getData() {
    const rand = () => Math.max(Math.floor(Math.random() * 10000), 1000);
    return [
      { x: "<5", y: rand(), label: "A", fill: "grey" },
      { x: "5-13", y: rand() },
      { x: "14-17", y: rand() },
      { x: "18-24", y: rand() },
      { x: "25-44", y: rand() },
      { x: "45-64", y: rand() },
      { x: "≥65", y: rand() },
    ];
  }

  render() {
    const containerStyle = {
      display: "flex",
      flexDirection: "row",
      flexWrap: "wrap",
      alignItems: "center",
      justifyContent: "center",
    };

    const parentStyle = {
      backgroundColor: "#f7f7f7",
      border: "1px solid #ccc",
      margin: "2%",
      maxWidth: "40%",
    };

    return (
      <div>
        <h1>VictoryPie Demo</h1>

        <div style={containerStyle}>
          <VictoryPie
            startAngle={90}
            endAngle={-90}
            style={{
              parent: parentStyle,
              labels: { fill: "white", fontSize: 10 },
            }}
            labelRadius={60}
            padding={{ bottom: 50, left: 50, right: 10 }}
            width={400}
            height={200}
          />
          <VictoryPie
            style={{
              parent: parentStyle,
              labels: { fill: "white", fontSize: 10 },
            }}
            labelRadius={({ datum }) => datum.radius - 12}
            padding={{ bottom: 50, left: 50, right: 10 }}
            width={400}
            height={200}
            radius={({ datum }) => datum.radius}
            data={[
              { x: 1, y: 1, radius: 40 },
              { x: 2, y: 3, radius: 50 },
              { x: 3, y: 5, radius: 70 },
              { x: 4, y: 2, radius: 80 },
              { x: 5, y: 3, radius: 60 },
            ]}
          />
          <VictoryPie
            style={{ parent: parentStyle }}
            labelPosition="endAngle"
            width={200}
            height={400}
          />
          <VictoryPie
            style={{ parent: parentStyle }}
            labelPosition="startAngle"
            width={200}
            height={400}
          />
          <VictoryPie
            style={{ parent: parentStyle }}
            width={200}
            height={400}
          />

          <VictoryPie style={{ parent: parentStyle }} />

          <VictoryPie
            animate={{ duration: 1000 }}
            style={{
              parent: parentStyle,
              labels: {
                fontSize: 10,
                paintOrder: "stroke",
                stroke: "#ffffff",
                strokeWidth: 3,
                strokeLinecap: "butt",
                strokeLinejoin: "miter",
              },
            }}
            data={this.state.transitionData}
          />

          <VictoryPie
            style={{ parent: parentStyle }}
            theme={VictoryTheme.material}
            events={[
              {
                target: "data",
                eventHandlers: {
                  onMouseOver: () => ({
                    mutation: (props) => ({
                      radius: 135,
                      sliceStartAngle: props.slice.startAngle + 0.05,
                      sliceEndAngle: props.slice.endAngle - 0.05,
                    }),
                  }),
                  onMouseOut: () => ({
                    mutation: () => null,
                  }),
                },
              },
            ]}
          />

          <VictoryPie
            style={{ parent: parentStyle }}
            theme={VictoryTheme.material}
            events={[
              {
                target: "parent",
                eventHandlers: {
                  onClick: () => {
                    return [
                      {
                        target: "labels",
                        mutation: () => {
                          return { text: "parent click" };
                        },
                      },
                    ];
                  },
                },
              },
            ]}
          />

          <VictoryPie
            style={{
              parent: parentStyle,
              labels: { fontSize: 10, padding: 10 },
            }}
            labelComponent={<VictoryTooltip />}
            colorScale="grayscale"
          />

          <VictoryPie
            style={{ ...this.state.style }}
            labelRadius={120}
            innerRadius={140}
          />

          <VictoryPie
            style={{
              parent: parentStyle,
              data: { stroke: "transparent", opacity: 0.4 },
            }}
          />

          <VictoryPie style={this.state.style} startAngle={-90} endAngle={90} />

          <VictoryPie
            style={{ ...this.state.style, labels: { fontSize: 0 } }}
            data={this.state.data}
            innerRadius={100}
            animate={{ duration: 2000 }}
            colorScale={this.state.colorScale}
          />

          <VictoryPie
            style={{ ...this.state.style, labels: { padding: 0 } }}
            data={this.state.data}
            innerRadius={100}
            labelRadius={110}
            animate={{ duration: 2000 }}
            colorScale={this.state.colorScale}
          />

          <VictoryPie
            style={{ ...this.state.style }}
            endAngle={90}
            innerRadius={140}
            padAngle={5}
            startAngle={-90}
          />

          <VictoryPie
            data={range(0, 6).map((i) => [i, Math.random()])}
            x={0}
            y={1}
            animate={{ duration: 2000 }}
            style={{
              ...this.state.style,
              data: { stroke: "#252525", strokeWidth: 2 },
            }}
            colorScale="warm"
          />

          <VictoryPie
            data={range(0, 6).map((i) => [i, Math.random()])}
            x={0}
            y={1}
            theme={VictoryTheme.material}
            style={{ parent: { maxWidth: "40%" } }}
            animate={{ duration: 2000 }}
          />

          <VictoryPie
            style={this.state.style}
            data={range(0, 2).map((i) => [i, Math.random()])}
            x={0}
            y={1}
            colorScale={["tomato", "orange"]}
            labels={[]}
            cornerRadius={20}
            startAngle={-6}
            animate={{ duration: 2000 }}
            innerRadius={140}
          />
          <VictoryPie
            style={{ parent: parentStyle, labels: { fill: "magenta" } }}
            radius={100}
            labelPosition="startAngle"
            labelPlacement="parallel"
            labels={({ datum }) => `${datum.l}\ndegrees`}
            data={[
              { x: 1, y: 1, l: 0 },
              { x: 2, y: 1, l: 45 },
              { x: 3, y: 1, l: 90 },
              { x: 4, y: 1, l: 135 },
              { x: 5, y: 1, l: 180 },
              { x: 6, y: 1, l: 225 },
              { x: 7, y: 1, l: 270 },
              { x: 8, y: 1, l: 315 },
            ]}
          />
          <VictoryPie
            style={{ parent: parentStyle, labels: { fill: "magenta" } }}
            radius={100}
            labelPosition="startAngle"
            labelPlacement="perpendicular"
            labels={({ datum }) => `${datum.l}\ndegrees`}
            data={[
              { x: 1, y: 1, l: 0 },
              { x: 2, y: 1, l: 45 },
              { x: 3, y: 1, l: 90 },
              { x: 4, y: 1, l: 135 },
              { x: 5, y: 1, l: 180 },
              { x: 6, y: 1, l: 225 },
              { x: 7, y: 1, l: 270 },
              { x: 8, y: 1, l: 315 },
            ]}
          />
        </div>
      </div>
    );
  }
}
