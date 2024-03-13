import { useState } from "react";
import FullCalendar, { formatDate } from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import listPlugin from "@fullcalendar/list";
import {
  Box,
  List,
  ListItem,
  ListItemText,
  Typography,
  useTheme,
} from "@mui/material";
import Header from "../../components/Header";
import { tokens } from "../../theme";

import ImageUpload from "./modal";
import Modal from '@mui/material/Modal';

const Calendar = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
   const [currentEvents, setCurrentEvents] = useState([]);
  //const [isAddModalVisible, setIsAddModalVisible] = useState(false);

  const [open, setOpen] = useState(false);
  // const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleDateClick = (selected) => {
    setOpen(true);
    //setIsAddModalVisible(true)
    // const title = prompt("Please enter a new title for your event");
    const calendarApi = selected.view.calendar;
    calendarApi.unselect();

    // if (title) {
    //   calendarApi.addEvent({
    //     id: `${selected.dateStr}-${title}`,
    //     title,
    //     start: selected.startStr,
    //     end: selected.endStr,
    //     allDay: selected.allDay,
    //   });
    // }
  };

  // -------------- Add Modal functions

  /*  const handleDateClick = (selected) => {
    const handleCancelAddModal = () => {
      setIsAddModalVisible(false);
    }
    const showAddModal = () => {
      setIsAddModalVisible(true);
    }

  };*/

  const handleEventClick = (selected) => {
    if (
      window.confirm(
        `Are you sure you want to delete the event '${selected.event.title}'`
      )
    ) {
      selected.event.remove();
    }
  };

  return (
    <div>
    <Box m="20px">
      {/* CALENDAR */}
      <Box>
        <Header title="Calendar" subtitle="Full Calendar Interactive Page" />

        <Box display="flex" justifyContent="space-between">
          {/* CALENDAR SIDEBAR */}
          <Box
            flex="1 1 20%"
            backgroundColor={colors.primary[400]}
            p="15px"
            borderRadius="4px"
          >
            <Typography variant="h5">Events</Typography>
            <List>
              {currentEvents.map((event) => (
                <ListItem
                  key={event.id}
                  sx={{
                    backgroundColor: colors.greenAccent[500],
                    margin: "10px 0",
                    borderRadius: "2px",
                  }}
                >
                  <ListItemText
                    primary={event.title}
                    secondary={
                      <Typography>
                        {formatDate(event.start, {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        })}
                      </Typography>
                    }
                  />
                </ListItem>
              ))}
            </List>
          </Box>

          <Box flex="1 1 100%" ml="15px">
            <FullCalendar
              height="75vh"
              plugins={[
                dayGridPlugin,
                timeGridPlugin,
                interactionPlugin,
                listPlugin,
              ]}
              headerToolbar={{
                left: "prev,next today",
                center: "title",
                right: "dayGridMonth,timeGridWeek,timeGridDay,listMonth",
              }}
              initialView="dayGridMonth"
              editable={true}
              selectable={true}
              selectMirror={true}
              dayMaxEvents={true}
              select={handleDateClick}
              eventClick={handleEventClick}
              eventsSet={(events) => setCurrentEvents(events)}
              initialEvents={[
                {
                  id: "12315",
                  title: "All-day event",
                  date: "2022-09-14",
                },
                {
                  id: "5123",
                  title: "Timed event",
                  date: "2022-09-28",
                },
              ]}
            />
          </Box>
        </Box>
      </Box>
    </Box>
     <Modal
     open={open}
     onClose={handleClose}
     aria-labelledby="modal-modal-title"
     aria-describedby="modal-modal-description"
     sx={{display:"flex",justifyContent: "center",alignItems: "center"}}
   >
    <ImageUpload onCancel={()=>setOpen(false)}/>
   </Modal>
   </div>
  );
};

export default Calendar;
