export const tools = {
  bold: ' ****',
  italic: ' __', 
  link: ' [](url)',
  list: ' \n-',  
  heading: ' \n##',
  underline: ' <u></u>',
  break: ' \n --- \n',
  code: ' \n```\n \n```\n'
}

export const mapTools = (tool) => {
  switch(tool) {
    case 'bold': 
      return tools.bold;

    case 'italic': 
      return tools.italic;

    case 'link': 
      return tools.link;
    
    case 'list': 
      return tools.list;

    case 'heading': 
      return tools.heading;

    case 'underline': 
      return tools.underline;

    case 'break': 
      return tools.break;

    case 'code': 
      return tools.code;
    default: 
      return '';
  }
}