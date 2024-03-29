class Car{
    name = 'car ' + Math.floor(Math.random() * 100) + 1;
    x = 0;
    y = 0;
    radius = 0; 
    color = "0xDE3249";
    startP; 
    endP; 
    startLane; 
    gotFLane = false; 
    startRoad; 
    gotFRoad = false;
    trips_fin = 0; 
    time = 0; 
    trip_time = [];
    speed = 1;
    present_lane;
    present_road;
    blocked = false;
    need_change = false;
    wait = 0; 

    constructor( given_x, given_y, r){
        this.x = given_x;
        this.y = given_y; 
        this.radius = r;
        this.speed = Math.floor(Math.random() * 3) + 1;
    }

    set_points(start, end ){
        this.startP = start; 
        this.endP = end; 
        this.x = start.x; 
        this.y = start.y; 
    }

    set_end(end){
        this.endP = end;
    }

    at_end(){
        this.trips_fin = this.trips_fin + 1;
        this.trip_time.push(this.time);
        this.time = 0; 
    }

    reset(){
        this.x = this.startP.x; 
        this.y = this.startP.y;
        this.at_end();
    }

    report(){
        console.log(this.trips_fin);
        var total = 0; 
        this.trip_time.forEach(time => {
            total = total + time;
        });
        console.log("average time " + total);
    }

    color( given_color){
        this.color = given_color;
    }

    set_pos(given_x, given_y){
        this.x = given_x; 
        this.y = given_y; 
    }

    set_x(given_x){
        this.x = given_x;
    }

    update_x(given_x){
        this.x = this.x + given_x;
    }

    update_blocked(bool){
        this.blocked = bool;
    }

    add_delay(){
        this.wait = this.wait + Math.floor(Math.random() * 16) + 1;
    }

    check_dir( pointList ){
        let max_dist = Math.pow(10, 1000);
        let choseI = -1;
        let i = 0;  
        // console.log(" point list ot check below ");
        // console.log(pointList);
        pointList.forEach(rPoint => {
            let found_dist = this.find_dis(this.endP, rPoint);
            // console.log(found_dist);
            if(found_dist < max_dist){
                max_dist = found_dist;
                choseI = i;
            }
            i++;
        });
        //console.log(choseI);
        return choseI;
    }

    find_dis(p1, p2){
        let a = p1.x - p2.x; 
        let b = p1.y - p2.y;

        return Math.sqrt( a*a + b*b);
    }

    update_dir(given_x, given_y, top_speed){
        if(this.wait == 0) {
            if( (given_x * this.speed ) <= top_speed && (given_y * this.speed ) <= top_speed  ) {
                this.x = this.x + (given_x * this.speed ); 
                this.y = this.y + (given_y * this.speed ); 
            } else {
                this.x = this.x + (given_x * top_speed ); 
                this.y = this.y + (given_y * top_speed ); 
            }
        } else {
            this.wait--; 
        }
    }

    get_lane( lane ){
        if( !this.gotFLane){
            this.startLane = lane; 
            this.gotFLane = true; 
        } 
        this.present_lane = lane;
    }

    get_road( road ){
        if( !this.gotFRoad){
            this.startRoad = road;
            this.gotFRoad = true; 
        }
        this.present_road = road;
    }

    draw( graphics){
        graphics.beginFill(0xDE3249, 1);
        graphics.drawCircle(this.x, this.y, this.radius);
        graphics.endFill();
        this.time++; 
    }

    draw_end(graphics){
        graphics.beginFill('#00FF00', 1);
        graphics.drawCircle(this.endP.x, this.endP.y, this.radius);
        graphics.endFill();
    }

    status(){
        console.log("       car: " + this.name);
        console.log("       x " + this.x + " y " + this.y);
        console.log("       start " + this.startP.x + " " + this.startP.y);
        console.log("       end " + this.endP.x + "  " + this.endP.y);
        console.log("       car need lane change: " + this.need_change);
    }
} 