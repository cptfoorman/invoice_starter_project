package cz.itnetwork.entity.filter;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.RequiredArgsConstructor;


//needs to be created in service layer and passed through specification
@Data
@AllArgsConstructor
public class InvoiceBuyerSellerFilter {
    private boolean buyer = false;
    private String identificationNumber;
}
