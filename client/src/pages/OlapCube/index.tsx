import { Autocomplete, FormControl, TextField } from "@mui/material"
import axios from "axios";
import { useEffect, useState } from "react"
import { 
  DimensionOptions, 
  DimensionOptionsKey, 
  FactOptions, 
  FactOptionsKey, 
  MetricOptionsKey, 
  MetricsOptions,
} from "./constants/options"

const OlapCube = () => {
  const [selectedFact, setSelectedFact] = useState<FactOptions>(FactOptions.Creation);
  const [selectedFirstDimension, setSelectedFirstDimension] = useState<typeof DimensionOptions>(
    Object.values(DimensionOptions[selectedFact])[0]
  );
  const [selectedSecondDimension, setSelectedSecondDimension] = useState<typeof DimensionOptions>(
    Object.values(DimensionOptions[selectedFact])[1]
  );
  const [selectedMetric, setSelectedMetric] = useState<typeof MetricsOptions>(
    Object.values(MetricsOptions[selectedFact])[0]
  );

  useEffect(() => {
    const firstDimension = Object.values(DimensionOptions[selectedFact])[0];
    setSelectedFirstDimension(firstDimension);

    const secondDimension = Object.values(DimensionOptions[selectedFact])[1];
    setSelectedSecondDimension(secondDimension);

    const firstMetric = Object.values(MetricsOptions[selectedFact])[0];
    setSelectedMetric(firstMetric);
  }, [selectedFact])

  const generateOlapCube = async () => {
    const body = {
      selectedFact,
      selectedFirstDimension,
      selectedSecondDimension,
      selectedMetric,
    };

    const response = await axios.post('http://localhost:3001/oltp-olap/generate-cube', body, {
      responseType: 'blob', 
    });

    const blob = new Blob([response.data], { type: 'text/csv' });

    const url = window.URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = 'olap_cube.csv';
    document.body.appendChild(a);
    a.click();
    a.remove();

    window.URL.revokeObjectURL(url);
  }

  return (
    <div className="w-full h-screen bg-[#C8BCF6] flex p-[32px] pt-[96px] flex-col justify-start gap-8">
      <p className="text-2xl font-semibold ml-8">
        Build Olap Cubes
      </p>
      <div className="bg-white rounded-md max-w-[335px]">
        <FormControl fullWidth>
          <Autocomplete
            disablePortal
            options={Object.keys(FactOptions)}
            sx={{ width: '300px', m: 2, mt: 4 }}
            renderInput={(params) => (
              <TextField 
                {...params} 
                error={!selectedFact} 
                label="Select a Fact" 
              />
            )}
            value={Object.keys(FactOptions).find((option) => FactOptions[option as FactOptionsKey] === selectedFact)}
            onChange={(_, newValue) => setSelectedFact(FactOptions[newValue as FactOptionsKey])}
            disableClearable
          />
        </FormControl>

        <FormControl fullWidth>
          <Autocomplete
            disablePortal
            options={Object.keys(
              DimensionOptions[selectedFact]
            ).filter((option) => (
              DimensionOptions[selectedFact][option as DimensionOptionsKey] !== selectedSecondDimension
            ))}
            sx={{ width: '300px', m: 2 }}
            renderInput={(params) => (
              <TextField 
                {...params} 
                error={!selectedFact}
                label="Select the First Dimension"
              />
            )}
            value={Object.keys(
              DimensionOptions[selectedFact]
            ).find((option) => (
              DimensionOptions[selectedFact][option as DimensionOptionsKey] === selectedFirstDimension
            ))}
            onChange={(_, newValue) => setSelectedFirstDimension(DimensionOptions[selectedFact][newValue as DimensionOptionsKey])}
            disableClearable
          />
        </FormControl>

        <FormControl fullWidth>
          <Autocomplete
            disablePortal
            options={Object.keys(
              DimensionOptions[selectedFact]
            ).filter((option) => (
              DimensionOptions[selectedFact][option as DimensionOptionsKey] !== selectedFirstDimension
            ))}
            sx={{ width: '300px', m: 2 }}
            renderInput={(params) => (
              <TextField
                {...params}
                error={!selectedFact}
                label="Select the Second Dimension"
              />
            )}
            value={Object.keys(
              DimensionOptions[selectedFact]
            ).find((option) => (
              DimensionOptions[selectedFact][option as DimensionOptionsKey] === selectedSecondDimension
            ))}
            onChange={(_, newValue) => setSelectedSecondDimension(DimensionOptions[selectedFact][newValue as DimensionOptionsKey])}
            disableClearable
          />
        </FormControl>

        <FormControl fullWidth>
          <Autocomplete
            disablePortal
            options={Object.keys(MetricsOptions[selectedFact])}
            sx={{ width: '300px', m: 2, mb: 4 }}
            renderInput={(params) => (
              <TextField 
                {...params} 
                error={!selectedFact} 
                label="Select a Metric" 
              />
            )}
            value={Object.keys(MetricsOptions[selectedFact]).find((option) => MetricsOptions[selectedFact][option as MetricOptionsKey] === selectedMetric)}
            onChange={(_, newValue) => setSelectedMetric(MetricsOptions[selectedFact][newValue as MetricOptionsKey])}
            disableClearable
          />
        </FormControl>

        <div className="w-full flex">
          <button
            onClick={generateOlapCube}
            className="flex gap-4 items-center justify-center h-[35px] w-[175px] rounded-lg bg-[#C8BCF6] shadow-md mb-4 ml-[140px]"
          >
            <p className='text-[16px] font-semibold'>
              Generate Olap Cube
            </p>
          </button>
        </div>
      </div>
    </div>
  )
}

export default OlapCube