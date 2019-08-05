create table shoe_data(
	id int not null primary key,
	colour text not null,
	brand text not null,
    price real not null,
    size int not null,
    item_stock int not null,
    image text 
);

create table basket(
    id int not null primary key,
    colour text not null,
	brand text not null,
    size int not null,
    qty int not null,
    cost int not null
);
