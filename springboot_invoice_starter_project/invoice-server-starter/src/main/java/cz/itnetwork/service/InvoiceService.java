package cz.itnetwork.service;


import cz.itnetwork.dto.InvoiceDTO;

import java.util.List;

public interface InvoiceService {

    InvoiceDTO getInvoice(long id);

    List<InvoiceDTO> getAllInvoices();

    void removeInvoice(long id);

    InvoiceDTO addInvoice(InvoiceDTO invoiceDTO);




}
