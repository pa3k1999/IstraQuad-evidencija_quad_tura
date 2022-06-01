import { Button, ButtonGroup, FormControlLabel, Paper, Stack, Switch, Typography } from '@mui/material';
import React, { useContext, useEffect, useState } from 'react';
import db from './firebase.config';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Brush,
  BarChart,
  Legend,
  Bar,
} from 'recharts';
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  limit,
  orderBy,
  query,
  setDoc,
  startAfter,
  Timestamp,
  where,
} from 'firebase/firestore';
import { GlobalContext } from './contexts/GlobalContext';
import TabWrap from './components/TabWrap';
import { Box } from '@mui/system';

const getVrsteTura = async () => {
  let data = [];
  const querySnapshot = await getDocs(collection(db, 'vrsteTura'));
  querySnapshot.forEach((doc) => {
    data.push({ id: doc.id, ...doc.data() });
  });
  return data;
};

const getZTure = async () => {
  let obj = {};
  const vrsteTura = await getVrsteTura();
  vrsteTura.sort((a, b) => {
    return a.minute - b.minute;
  });
  try {
    const queryTure = query(collection(db, 'ture'), orderBy('vrijemePocetka'));
    const queryRef = await getDocs(queryTure);
    queryRef.forEach((doc) => {
      const date = doc.data().vrijemePocetka.toDate();
      const temp = obj[`${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()}`] || [];
      temp.push({ id: doc.id, ...doc.data() });
      obj = {
        ...obj,
        [`${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()}`]: temp,
      };
    });
  } catch (e) {
    console.error(e);
  }

  const zasebnoTemplte = Object.fromEntries(vrsteTura.map((vT) => [vT.id, 0]));
  let zasebnoTureUkupno = { ...zasebnoTemplte };
  let zasebnoSatiUkupno = { ...zasebnoTemplte };
  var dataArray = new Array();
  const length = Object.keys(obj).length;
  const stopDateRaw = Object.values(obj)[length - 1][0].vrijemePocetka.toDate();
  const stopDate = new Date(stopDateRaw.getFullYear(), stopDateRaw.getMonth(), stopDateRaw.getDate(), 0, 0, 0);
  const startDateRaw = Object.values(obj)[0][0].vrijemePocetka.toDate();
  var startDate = new Date(startDateRaw.getFullYear(), startDateRaw.getMonth(), startDateRaw.getDate(), 0, 0, 0);
  while (startDate <= stopDate) {
    const stringDate = `${startDate.getDate()}.${startDate.getMonth() + 1}.${startDate.getFullYear()}`;
    const ture = obj[stringDate] ? obj[stringDate].length : 0;
    let tureSati = 0;
    let zasebnoTure = { ...zasebnoTemplte };
    let zasebnoSati = { ...zasebnoTemplte };

    obj[stringDate] &&
      obj[stringDate].forEach((t) => {
        tureSati = tureSati + vrsteTura.find((vT) => vT.id === t.vrstaTureId).minute;
        zasebnoTure[`${t.vrstaTureId}`] = zasebnoTure[`${t.vrstaTureId}`] + 1;
        zasebnoSati[`${t.vrstaTureId}`] =
          zasebnoSati[`${t.vrstaTureId}`] + vrsteTura.find((vT) => vT.id === t.vrstaTureId).minute;
        zasebnoTureUkupno[`${t.vrstaTureId}`] = zasebnoTureUkupno[`${t.vrstaTureId}`] + 1;
        zasebnoSatiUkupno[`${t.vrstaTureId}`] =
          zasebnoSatiUkupno[`${t.vrstaTureId}`] + vrsteTura.find((vT) => vT.id === t.vrstaTureId).minute;
      });

    dataArray.push({
      datum: stringDate,
      sve: { ture: ture, sati: tureSati },
      zasebno: { ture: zasebnoTure, sati: zasebnoSati },
    });
    startDate.setDate(startDate.getDate() + 1);
  }
  return {
    vrsteTura: vrsteTura.map((vT) => vT.id),
    data: dataArray,
    dataSve: { ture: [zasebnoTureUkupno], sati: [zasebnoSatiUkupno] },
  };
};

const CustomTooltipSve = ({ active, payload, label, data, isSati }) => {
  if (active && payload && payload.length) {
    return (
      <Paper elevation={5} sx={{ minWidth: '50px', padding: '0 5px' }}>
        <Typography padding={1} paddingBottom={0}>
          {data[label] ? data[label].datum : ''}
        </Typography>
        <Typography padding={1} color={payload[0].color}>
          {isSati ? 'Ukupno sati: ' : 'Br. tura: '}
          {isSati ? payload[0].value / 60 + 'H' : payload[0].value}
        </Typography>
      </Paper>
    );
  }
  return null;
};

const CustomTooltipZasebno = ({ active, payload, label, data, vrsteTura, isSati }) => {
  if (active && payload && payload.length) {
    return (
      <Paper elevation={5} sx={{ minWidth: '50px', padding: '0 5px' }}>
        <Typography padding={1} paddingBottom={0}>
          {data[label].datum}
        </Typography>
        {vrsteTura.map((vT, i) => (
          <Typography key={i} padding={1} paddingBottom={0} color={payload[i].color}>
            {vT}: {isSati ? payload[i].value / 60 + 'H' : payload[i].value}
          </Typography>
        ))}
      </Paper>
    );
  }
  return null;
};

function StatistikaPage() {
  const { theme } = useContext(GlobalContext);

  const [statistikaData, setStatistikaData] = useState([]);
  const [isSati, setIsSati] = useState(false);
  const [isZasebno, setIsZasebno] = useState(false);
  const boje = ['#f43636', '#f47c36', '#f4d136', '#85f436', '#36f49b', '#36d1f4'];

  useEffect(() => {
    getZTure().then((dat) => setStatistikaData(dat));
  }, []);

  const handleToggleIsSati = () => {
    setIsSati(!isSati);
  };

  const handleToggleIsZasebno = () => {
    setIsZasebno(!isZasebno);
  };

  console.log(statistikaData);

  return (
    <TabWrap title={<Typography variant="h6">Statistika</Typography>}>
      <Stack justifyContent="space-evenly" direction="row" margin={1}>
        <ButtonGroup size="small" onClick={handleToggleIsSati}>
          <Button variant={isSati ? 'outlined' : 'contained'}>Br. tura</Button>
          <Button variant={!isSati ? 'outlined' : 'contained'}>Ukupno sati</Button>
        </ButtonGroup>
        <ButtonGroup size="small" onClick={handleToggleIsZasebno}>
          <Button variant={isZasebno ? 'outlined' : 'contained'}>Sve</Button>
          <Button variant={!isZasebno ? 'outlined' : 'contained'}>Zasebno</Button>
        </ButtonGroup>
      </Stack>
      <Box marginBottom={2}>
        <ResponsiveContainer width="100%" height={200}>
          <AreaChart data={statistikaData.data} syncId="sync" margin={{ top: 5, right: 0, left: 0, bottom: 0 }}>
            {isZasebno ? (
              <>
                {statistikaData.vrsteTura &&
                  statistikaData.vrsteTura.map((vT, i) => (
                    <Area
                      key={i}
                      dataKey={`zasebno.${isSati ? 'sati' : 'ture'}.${vT}`}
                      stackId="1"
                      type="monotone"
                      stroke={boje[i]}
                      fill={boje[i]}
                    />
                  ))}
                <Tooltip
                  content={
                    <CustomTooltipZasebno
                      data={statistikaData.data}
                      vrsteTura={statistikaData.vrsteTura}
                      isSati={isSati}
                    />
                  }
                />
              </>
            ) : (
              <>
                <Area
                  dataKey={`sve.${isSati ? 'sati' : 'ture'}`}
                  type="monotone"
                  stroke={theme.palette.primary.main}
                  fill={theme.palette.primary.light}
                />
                <Tooltip content={<CustomTooltipSve data={statistikaData.data} isSati={isSati} />} />
              </>
            )}
          </AreaChart>
        </ResponsiveContainer>
        <ResponsiveContainer width="100%" height={30}>
          <AreaChart data={statistikaData.data} syncId="sync" margin={{ top: 0, right: 80, left: 80, bottom: 0 }}>
            <Brush dataKey="datum" height={30} stroke={theme.palette.primary.main} onChange={e => console.log(e)}/>
            <Area />
          </AreaChart>
        </ResponsiveContainer>
      </Box>
      <Box paddingBottom={1}>
        <ResponsiveContainer width="100%" height={100}>
          <BarChart layout="vertical" stackOffset="expand" barCategoryGap={0} data={statistikaData.dataSve && (isSati ? statistikaData.dataSve.sati : statistikaData.dataSve.ture)} margin={0}>
            <Tooltip />
            <XAxis hide={true} type="number" />
            <YAxis hide={true} dataKey="datum" type="category" />
            <Legend />
            {statistikaData.vrsteTura &&
              statistikaData.vrsteTura.map((vT, i) => (
                <Bar dataKey={vT} stackId="a"  fill={boje[i]} />
              ))}
          </BarChart>
        </ResponsiveContainer>
      </Box>
      
    </TabWrap>
  );
}

export default StatistikaPage;
