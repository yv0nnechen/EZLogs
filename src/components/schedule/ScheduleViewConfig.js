const ScheduleIDs = {
  CONCRETE_ID: 'concrete',
  REBAR_ID: 'rebar',
  MACHINARY_ID: 'machinery',
};

const ScheduleViewConfig = {
  types: [{
    id: ScheduleIDs.CONCRETE_ID,
    displayName: 'Concrete',
    despt: 'Order new concrete with mix and addictives',
    icon: '$concrete',
    color: 'primary',
  },
  {
    id: ScheduleIDs.REBAR_ID,
    displayName: 'Rebar',
    despt: 'Order new rebars according to drawings',
    icon: '$rebar',
    color: 'info',
  },
  {
    id: ScheduleIDs.MACHINARY_ID,
    displayName: 'Machinery',
    despt: 'Schedule machinery and equipment rental',
    icon: '$machinery',
    color: 'warning',
  }],
};

const CONCRETE_GRADES = [
  'MPA Skim',
  'MPA Fill',
  'MPA Skim',
  'MPA Fill',
  'MPA SKIM',
  'MPA SKIM',
  'MPA SKIM',
  'MPA N',
  'MPA with Gravel',
  'MPA C-4',
  'MPA F-2',
  'MPA F-2 Thermal',
  'MPA N',
  'MPA C-2',
  'MPA N',
  'MPA F-2',
  'MPA C-1',
  'MPA C-1 CIA',
  'MPA',
  'MPA C1',
  'MPA F-2',
  'MPA N',
  'MPA F-2',
  'MPA C1',
  'MPA F-2',
];

const CONCRETE_ADMIXTURE = [{
  mixId: 'air',
  shortName: 'Air',
  displayName: 'Air-Entraining Admixtures',
  tooltip: "improves the concrete's resistance to damage casued by exposure to cycles of freezing and thawing and deicing salt application.",
},
{
  mixId: 'water',
  shortName: 'Water',
  displayName: 'Water Reducers',
  tooltip: '(1) to lower water conent and to increase strength.\n (2) to obtain higher slump',
},
{
  mixId: 'hrwr',
  shortName: 'HRWR',
  displayName: 'High Range Water Reducers',
  tooltip: 'produce high strength and high performance concrete. But can cause higher rate of slump loss with time.',
},
{
  mixId: 'retarders',
  shortName: 'Retard',
  displayName: 'Retarders',
  tooltip: 'delay the initial setting of concrete by an hour or more.',
},
{
  mixId: 'accelerators',
  shortName: 'Acce.',
  displayName: 'Accelerators',
  tooltip: 'reduce the initial setting time of concrete and produces higher strength at early ages.',
},
{
  mixId: 'other',
  shortName: 'Other',
  displayName: 'Other',
  tooltip: 'other admixtures.',
}];

const PROJECTS = ['Yonge Parc - E', 'Yonge Parc - F', 'New Era - C', 'New Era - D'];

export {
  ScheduleIDs, ScheduleViewConfig, CONCRETE_ADMIXTURE, CONCRETE_GRADES, PROJECTS,
};
