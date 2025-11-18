export const getNavPanelListItems = () => {
  return [
    { id: '0', name: 'Admins', value: 'admins', icon: 'manage_accounts' },
    { id: '1', name: 'Users', value: 'users', icon: 'groups' },

    { id: '2', name: 'Clinics', value: 'clinics', icon: 'medical_services' },
    { id: '3', name: 'Filials', value: 'filials', icon: 'corporate_fare' },
    { id: '4', name: 'Employees', value: 'employees', icon: 'account_circle' },
    {
      id: '14',
      name: 'Employee Schedule',
      value: 'employee-schedule',
      icon: 'schedule',
    },
    {
      id: '5',
      name: 'Appointments',
      value: 'appointments',
      icon: 'event_list',
    },
    { id: '6', name: 'Favours', value: 'favours', icon: 'medical_services' },
    {
      id: '7',
      name: 'Favour categories',
      value: 'favour_categories',
      icon: 'home_health',
    },
    { id: '8', name: 'Schedule', value: 'schedule', icon: 'schedule' },
    {
      id: '9',
      name: 'Schedule Connections',
      value: 'connections-schedule',
      icon: 'link',
    },

    {
      id: '10',
      name: 'Documents',
      value: 'documents',
      icon: 'folder_open',
    },
    { id: '11', name: 'Chats', value: 'chats', icon: 'chat' },
    {
      id: '12',
      name: 'Chatbots',
      value: 'chatbots',
      icon: 'smart_toy',
    },
    { id: '13', name: 'Prompts', value: 'prompts', icon: 'text_ad' },
  ]
}
