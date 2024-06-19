export interface Books {
  id: number;
  nameBook: string;
  studentBorrow: string;
  dateBorrow: string;
  datePaid: string;
  status: boolean;
}

export interface ActionBooks {
  type: string;
  payload: Books;
}
