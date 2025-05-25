package cz.itnetwork.entity.filter;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.RequiredArgsConstructor;

//filter for getting buyer or seller and fetching by identification number to prevent bugs with looking up raw ids
//needs to be created in service layer and passed through specification
@Data
@AllArgsConstructor
public class InvoiceBuyerSellerFilter {
    private boolean buyer = false;
    private String identificationNumber;
}
