import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import CardActionArea from '@mui/material/CardActionArea';

const activities = [
  {
    id: 1,
    name: "Coffee Run",
    description: "Grab coffee, talk for hours, and enjoy a cozy little café together.",
    duration: "1 hour",
    image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=800&auto=format&fit=crop"
  },
  {
    id: 2,
    name: "Movie Night",
    description: "Watch a movie together with snacks, blankets, and lots of cuddles.",
    duration: "2.5 hours",
    image: "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=800&auto=format&fit=crop"
  },
  {
    id: 3,
    name: "Dinner Date",
    description: "Go out for a nice dinner and spend the evening enjoying good food and better company.",
    duration: "2 hours",
    image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&auto=format&fit=crop"
  },
  {
    id: 4,
    name: "Picnic",
    description: "Have a cute picnic outside with snacks, drinks, and a relaxing view.",
    duration: "2 hours",
    image: "https://images.unsplash.com/photo-1528605248644-14dd04022da1?w=800&auto=format&fit=crop"
  },
  {
    id: 5,
    name: "Ice Cream",
    description: "Get ice cream together and take a sweet little walk afterward.",
    duration: "45 minutes",
    image: "https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=800&auto=format&fit=crop"
  },
  {
    id: 6,
    name: "Arcade Date",
    description: "Play arcade games, compete for prizes, and see who gets the highest score.",
    duration: "1.5 hours",
    image: "https://images.unsplash.com/photo-1511882150382-421056c89033?w=800&auto=format&fit=crop"
  },
  {
    id: 7,
    name: "Museum Visit",
    description: "Explore a museum together and pretend to be very sophisticated art critics.",
    duration: "2 hours",
    image: "https://images.unsplash.com/photo-1564399579883-451a5d44ec08?w=800&auto=format&fit=crop"
  },
  {
    id: 8,
    name: "Cooking Together",
    description: "Make a meal together, laugh through the chaos, and enjoy something homemade.",
    duration: "2 hours",
    image: "https://images.unsplash.com/photo-1556911220-bff31c812dba?w=800&auto=format&fit=crop"
  },
  {
    id: 9,
    name: "Park Walk",
    description: "Take a peaceful walk in the park and enjoy some quiet time together.",
    duration: "1 hour",
    image: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&auto=format&fit=crop"
  },
  {
    id: 10,
    name: "Dessert Date",
    description: "Go somewhere just for dessert because sweet dates deserve sweet treats.",
    duration: "1 hour",
    image: "https://images.unsplash.com/photo-1551024506-0bccd828d307?w=800&auto=format&fit=crop"
  }
];

export default function DateActivities({ selectedActivities, setSelectedActivities }) {
  return (
    <Box
      sx={{
        width: '100%',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(min(200px, 100%), 1fr))',
        gap: 2,
      }}
    >
      {activities.map((activity) => (
        <Card key={activity.id}>
          <CardActionArea
            onClick={() => {
              const isSelected = selectedActivities.includes(activity.name);
              setSelectedActivities(isSelected
                ? selectedActivities.filter((name) => name !== activity.name)
                : [...selectedActivities, activity.name]
              );
            }}
            data-active={selectedActivities.includes(activity.name) ? '' : undefined}
            sx={{
              height: '100%',
              '&[data-active]': {
                backgroundColor: 'action.selected',
                '&:hover': {
                  backgroundColor: 'action.selectedHover',
                },
              },
            }}
          >
            <CardMedia
              sx={{ height: 140 }}
              image={activity.image}
              title={activity.name}
            />
            <CardContent sx={{ height: '100%' }}>
              <Typography variant="h5" component="div">
                {activity.name}
              </Typography>
              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                {activity.description}
              </Typography>
              <Typography variant="body2" sx={{ color: 'text.muted' }}>
                {activity.duration}
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      ))}
    </Box>
  );
}