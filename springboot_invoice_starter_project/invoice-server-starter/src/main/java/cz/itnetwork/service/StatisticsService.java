package cz.itnetwork.service;

import cz.itnetwork.dto.InvoiceStatisticsDTO;
import cz.itnetwork.dto.PersonStatisticsDTO;

import java.util.List;

public interface StatisticsService {
    InvoiceStatisticsDTO getInvoiceAllTimeStatistics();
    List<PersonStatisticsDTO> getPersonsStatistics();
}
