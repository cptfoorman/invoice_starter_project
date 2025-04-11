package cz.itnetwork.service;


import cz.itnetwork.dto.InvoiceDTO;
import cz.itnetwork.entity.filter.InvoiceFilter;

import java.util.List;

public interface InvoiceService {

    InvoiceDTO getInvoice(long id);

    List<InvoiceDTO> getAllInvoices(InvoiceFilter invoiceFilter);

    void removeInvoice(long id);

    InvoiceDTO addInvoice(InvoiceDTO invoiceDTO);

    InvoiceDTO editInvoice(long id, InvoiceDTO invoiceDTO);



}
