import React, { useState, useEffect } from "react";
import "./App.css"

interface Param {
  id: number;
  name: string;
  type: "string";
}

interface ParamValue {
  paramId: number;
  value: string;
}

interface Model {
  paramValues: ParamValue[];
  colors: string[];
}

interface Props {
  params: Param[];
  model: Model;
}

const ParamEditor: React.FC<Props> = ({ params, model }) => {
  const [paramValues, setParamValues] = useState<ParamValue[]>(
    model.paramValues
  );

  const handleParamChange = (paramId: number, value: string) => {
    setParamValues((prevValues) =>
      prevValues.map((param) =>
        param.paramId === paramId ? { ...param, value } : param
      )
    );
  };

  const getModel = (): Model => {
    return {
      paramValues,
      colors: model.colors,
    };
  };

  useEffect(() => {
    const initialParamValues = params.map((param) => {
      const existingValue = model.paramValues.find(
        (pv) => pv.paramId === param.id
      );
      return existingValue || { paramId: param.id, value: "" };
    });
    setParamValues(initialParamValues);
  }, [params, model.paramValues]);

  return (
    <div className="param-editor">
      {params.map((param) => {
        const paramValue =
          paramValues.find((pv) => pv.paramId === param.id)?.value || "";
        return (
          <div key={param.id}  className="param-item">
            <label>{param.name}:</label>
            <input
              type="text"
              value={paramValue}
              onChange={(e) => handleParamChange(param.id, e.target.value)}
            />
          </div>
        );
      })}
      <button onClick={() => console.log(getModel())}>
        Получить модель
      </button>
    </div>
  );
};

const App: React.FC = () => {
  const params: Param[] = [
    { id: 1, name: "Назначение", type: "string" },
    { id: 2, name: "Длина", type: "string" },
  ];

  const model: Model = {
    paramValues: [
      { paramId: 1, value: "повседневное" },
      { paramId: 2, value: "макси" },
    ],
    colors: [],
  };

  return <ParamEditor params={params} model={model} />;
};

export default App;
