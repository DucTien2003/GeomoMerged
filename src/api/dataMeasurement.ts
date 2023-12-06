// import axios from 'axios';

export const getDataMeasurement = async () => {
  try {
    // const response = await axios.get('http://127.0.0.1:6868');
    // console.log(response);

    // Transform data after fetching
    // return response.data.map((entriesOfYear: EntriesOfYear) => {
    //   return {
    //     ...entriesOfYear,
    //     entries: entriesOfYear.entries.map((entry: Entry) => {
    //       return {
    //         ...entry,
    //         checked: false,
    //         time: dayjs(entry.time),
    //       };
    //     }),
    //   };
    // });

    const dt = [
      {
        type: 'linear',
        statistics: [
          { title: 'Neck to upper hip length', value: 52.9 },
          { title: 'abc', value: 10 },
        ],
      },
      {
        type: 'volumetric',
        statistics: [
          { title: 'xyz', value: 123 },
          { title: 'abc', value: 10 },
        ],
      },
    ];

    return dt;
  } catch (error) {
    // Handle errors
    console.log(error);
    throw error; // Re-throw the error to handle it outside
  }
};
