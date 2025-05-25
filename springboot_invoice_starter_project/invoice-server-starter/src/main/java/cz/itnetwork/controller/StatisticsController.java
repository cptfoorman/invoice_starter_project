package cz.itnetwork.controller;


import cz.itnetwork.dto.InvoiceStatisticsDTO;
import cz.itnetwork.dto.PersonStatisticsDTO;
import cz.itnetwork.service.StatisticsServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
public class StatisticsController {

    @Autowired
    private StatisticsServiceImpl statisticsService;

    /*
    * calls service layer to fetch all time statistics
    * @return InvoiceStatisticsDTO*/
    @GetMapping("/invoices/statistics")
    private InvoiceStatisticsDTO getAllTimmeStats(){
        return statisticsService.getInvoiceAllTimeStatistics();
    }

    /*
     * calls service layer to fetch statistics for each person
     * @return list<PersonStatisticsDTO>*/
    @GetMapping("/persons/statistics")
    private List<PersonStatisticsDTO> getPersonsStats(){
        return statisticsService.getPersonsStatistics();
    }
}
