package cz.itnetwork.entity.filter;


import lombok.Data;

//generic filter for invoices

@Data
public class InvoiceFilter {
    private Long buyerId;
    private Long sellerId;
    private String product;
    private Double minPrice;
    private Double maxPrice;
    private Integer limit = 10;
}
