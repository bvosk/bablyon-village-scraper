export class CalendarEvent {
  public Name: string;
  public Date: Date;
  
  constructor(name: string, date: Date) {
    this.Name = name;
    this.Date = date;
  }
}