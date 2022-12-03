export class CalendarEvent {
  public Name: string;
  public Date: Date;
  public Place: string;
  
  constructor(name: string, date: Date, place: string) {
    this.Name = name;
    this.Date = date;
    this.Place = place;
  }
}