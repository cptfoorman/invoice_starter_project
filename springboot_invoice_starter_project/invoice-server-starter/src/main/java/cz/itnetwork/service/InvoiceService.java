package cz.itnetwork.service;


import cz.itnetwork.dto.InvoiceDTO;
import cz.itnetwork.entity.filter.InvoiceFilter;
import org.springframework.http.HttpStatus;

import java.util.List;

public interface InvoiceService {

    InvoiceDTO getInvoice(long id);

    List<InvoiceDTO> getAllInvoices(InvoiceFilter invoiceFilter);

    HttpStatus removeInvoice(long id);

    InvoiceDTO addInvoice(InvoiceDTO invoiceDTO);

    InvoiceDTO editInvoice(long id, InvoiceDTO invoiceDTO);

    List<InvoiceDTO> getBuyersByIdNum(long idNum);

    List<InvoiceDTO> getSellersByIdNum(long idNum);

}
